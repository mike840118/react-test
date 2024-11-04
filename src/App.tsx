// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Input, Button, Table, Form, Select } from 'antd';
import axios from 'axios';

interface DataType {
  key: string; 
  sno: string; 
  sna: string; 
  sarea: string; 
  ar: string; 
  available_rent_bikes: number;
  available_return_bikes: number; 
  total: number; 
  updateTime: string;
}

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isQueried, setIsQueried] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | undefined>(undefined); 

  useEffect(() => {
    if (!isQueried) return;
    const interval = setInterval(() => {
      onSearch();
    }, 60000);

    return () => clearInterval(interval);
  }, [isQueried]);

  const onSearch = () => {
    setLoading(true);
    setIsQueried(true); 
    axios.get('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
      .then((response) => {
        const formattedData = response.data.map((item: any) => ({
          key: item.sno,
          sno: item.sno,
          sna: item.sna,
          sarea: item.sarea,
          ar: item.ar,
          available_rent_bikes: item.available_rent_bikes, 
          available_return_bikes: item.available_return_bikes, 
          total: item.total,
          updateTime: item.updateTime,
        }));

        const formData = form.getFieldsValue();
        const { name } = formData; 
        const filteredData = formattedData.filter(item => {
          const matchesArea = selectedArea ? item.sarea === selectedArea : true;
          const matchesName = name ? item.sna.includes(name) : true; 
          return matchesArea && matchesName; 
        });

        setData(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAreaChange = (value: string) => {
    setSelectedArea(value); 
  };

  const columns = [
    {
      title: '站點編號',
      dataIndex: 'sno',
      key: 'sno',
      width:100,
    },
    {
      title: '站點名稱',
      dataIndex: 'sna',
      key: 'sna',
      width:250,
    },
    {
      title: '行政區',
      dataIndex: 'sarea',
      key: 'sarea', 
      width:100,
    },
    {
      title: '地址',
      dataIndex: 'ar',
      key: 'ar',
      width:300,
    },
    {
      title: '可租借車輛數',
      dataIndex: 'available_rent_bikes',
      key: 'available_rent_bikes',
      sorter: (a: DataType, b: DataType) => a.available_rent_bikes - b.available_rent_bikes, 
      width:150,
    },
    {
      title: '可歸還空位數',
      dataIndex: 'available_return_bikes',
      key: 'available_return_bikes',
      sorter: (a: DataType, b: DataType) => a.available_return_bikes - b.available_return_bikes, 
      width:150,
    },
    {
      title: '總車輛數',
      dataIndex: 'total',
      key: 'total',
      width:100,
    },
    {
      title: '更新時間',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width:150,
    },
  ];

  const areas = [
    { label: '中正區', value: '中正區' },
    { label: '大同區', value: '大同區' },
    { label: '松山區', value: '松山區' },
    { label: '大安區', value: '大安區' },
    { label: '萬華區', value: '萬華區' },
    { label: '信義區', value: '信義區' },
    { label: '士林區', value: '士林區' },
    { label: '北投區', value: '北投區' },
    { label: '內湖區', value: '內湖區' },
    { label: '南港區', value: '南港區' },
    { label: '文山區', value: '文山區' },
  ];
  return (
    <div style={{ padding: 24 }}>
      <h2>查詢頁面</h2>
      <Form form={form} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item name="name" label="站點名稱">
          <Input placeholder="輸入站點名稱" />
        </Form.Item>
        <Form.Item name="sarea" label="行政區">
          <Select placeholder="選擇行政區" onChange={handleAreaChange} options={areas} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSearch}>
            查詢
          </Button>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={data}
        // pagination={{ pageSize: 5 }}
        rowKey="sno" // 設定 id 參數為 sno
        loading={loading}
      />
    </div>
  );
};

export default App;
