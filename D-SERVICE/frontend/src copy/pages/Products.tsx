import React, { useState, useEffect } from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import {
  Card,
  Typography,
  Alert,
  Table,
  Radio,
  Divider,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  getProducts,
  getProductById,
  updateProductById,
  addProduct,
  deleteProduct,
} from '@/services/backend/api';
import { text } from 'express';

type LayoutType = Parameters<typeof Form>[0]['layout'];
const { Option } = Select;

export default (): React.ReactNode => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const [dataProducts, setDataProducts] = useState<API.ProductsItem[]>([]);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [disbledButton, setDisbledButton] = useState(true);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStatus, setProductStatus] = useState('');
  const [deleteId, setDeleteId] = useState([]);

  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: { span: 14, offset: 4 },
        }
      : null;

  const showEditModal = async (id: string) => {
    const result = await getProductById(id);
    if (result) {
      setProductId(result[0].id);
      setProductName(result[0].product_name);
      setProductPrice(result[0].product_price);
      setProductStatus(result[0].product_status);
      setIsModalVisible1(true);
    }
  };

  const showAddModal = async () => {
    setIsModalVisible2(true);
  };

  const handleUpdateProduct = async () => {
    const data = {
      id: productId,
      product_name: productName,
      product_price: productPrice,
      product_status: productStatus,
    };
    const update = await updateProductById(data);
    if (update) {
      refeshTable();
      setIsModalVisible1(false);
    }
  };

  const deleteProductClick = async () => {
    const data = {
      data: deleteId,
    };
    const statusDelete = await deleteProduct(data);
    if (statusDelete) {
      refeshTable();
      setDisbledButton(true);
    }
  };

  const handleAddProduct = async () => {
    const data = {
      product_name: productName,
      product_price: productPrice,
      product_status: productStatus,
    };
    const status = await addProduct(data);
    if (status) {
      refeshTable();
      setIsModalVisible2(false);
    }
  };

  const clearState = () => {
    setProductId('');
    setProductName('');
    setProductPrice('');
    setProductStatus('');
    // console.log(productId)
    // console.log(productName)
    // console.log(productId)
    // console.log(productId)
  };

  const refeshTable = async () => {
    const result = await getProducts();
    const data = result.map(
      (x: {
        id: any;
        product_code: any;
        product_name: any;
        product_status: any;
        product_price: any;
        updatedAt: any;
      }) => {
        const mapData = {
          id: x.id,
          product_code: x.product_code,
          product_name: x.product_name,
          product_status: x.product_status,
          product_price: x.product_price,
          updatedAt: x.updatedAt,
        };
        return mapData;
      },
    );
    setDataProducts(data);
    clearState();
  };

  const handleCancelUpdate = () => {
    setIsModalVisible1(false);
    clearState();
  };

  const handleCancelAdd = () => {
    clearState();
    setIsModalVisible2(false);
  };

  const columns = [
    {
      title: 'Product Code',
      dataIndex: 'product_code',
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
    },
    {
      title: 'Product Status',
      dataIndex: 'product_status',
    },
    {
      title: 'Price',
      dataIndex: 'product_price',
    },
    {
      title: 'Last Update',
      dataIndex: 'updatedAt',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (text: string) => (
        <a href="#" onClick={() => showEditModal(text)}>
          Edit
        </a>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: API.ProductsItem[]) => {
      if (selectedRowKeys.length == 0) {
        setDisbledButton(true);
      } else {
        setDisbledButton(false);
        setDeleteId(selectedRowKeys);
      }
    },
    getCheckboxProps: (record: API.ProductsItem) => ({
      // disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.product_name,
    }),
  };

  useEffect(() => {
    (async function fetchdata() {
      const result = await getProducts();
      const data = result.map(
        (x: {
          id: any;
          product_code: any;
          product_name: any;
          product_status: any;
          product_price: any;
          updatedAt: any;
        }) => {
          const mapData = {
            id: x.id,
            product_code: x.product_code,
            product_name: x.product_name,
            product_status: x.product_status,
            product_price: x.product_price,
            updatedAt: x.updatedAt,
          };
          return mapData;
        },
      );
      setDataProducts(data);
    })();
  }, []);

  function confirmDelete() {
    Modal.confirm({
      title: 'Are you sure delete this product?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteProductClick();
      },
    });
  }

  return (
    <>
      <PageHeaderWrapper>
        <Card>
          <Typography.Title level={2} style={{ textAlign: 'center' }}>
            <div>
              <Divider />
              <Row justify="end" style={{ marginBottom: '0.5rem' }}>
                <Col span={4}>
                  <Button type="default">Import</Button>{' '}
                  <Button type="primary" onClick={showAddModal}>
                    Add
                  </Button>{' '}
                  <Button danger disabled={disbledButton} onClick={confirmDelete}>
                    Delete
                  </Button>
                </Col>
              </Row>
              <Table
                rowSelection={{
                  type: 'checkbox',
                  ...rowSelection,
                }}
                rowKey="id"
                columns={columns}
                dataSource={dataProducts}
              />
            </div>
          </Typography.Title>
        </Card>
      </PageHeaderWrapper>
      <Modal
        title="Edit Product"
        visible={isModalVisible1}
        onOk={handleUpdateProduct}
        onCancel={handleCancelUpdate}
      >
        <h5>{productName}</h5>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="Name">
            <Input
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Price">
            <InputNumber min={0} value={productPrice} onChange={(e) => setProductPrice(e)} />
          </Form.Item>
          <Form.Item label="Status">
            <Select value={productStatus} onChange={(e) => setProductStatus(e)}>
              <Option value="Active" selected>
                Active
              </Option>
              <Option value="Not Active">Not Active</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Product"
        visible={isModalVisible2}
        onOk={handleAddProduct}
        onCancel={handleCancelAdd}
      >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
          id="addForm"
        >
          <Form.Item label="Name">
            <Input onChange={(e) => setProductName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Price">
            <InputNumber min={0} onChange={(e) => setProductPrice(e)} />
          </Form.Item>
          <Form.Item label="Status">
            <Select onChange={(e) => setProductStatus(e)}>
              <Option value="Active" selected>
                Active
              </Option>
              <Option value="Not Active">Not Active</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
