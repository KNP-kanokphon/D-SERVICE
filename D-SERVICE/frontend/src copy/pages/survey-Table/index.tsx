import { Table } from 'antd';

const columns = [
  {
    title: 'Compay Name',
    dataIndex: 'company_name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    onFilter: (value: any, record: { company_name: string | any[] }) =>
      record.company_name.indexOf(value) === 0,
    // sorter: (a: { company_name: string | any[] }, b: { company_name: string | any[] }) =>
    //   a.company_name.length - b.company_name.length,
    // sortDirections: ['descend'],
  },
  {
    title: 'Project Name',
    dataIndex: 'project_name',
    // defaultSortOrder: 'descend',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value: any, record: { status: string | any[] }) =>
      record.status.indexOf(value) === 0,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value: any, record: { status: string | any[] }) =>
      record.status.indexOf(value) === 0,
  },
];

const data = [
  {
    key: '1',
    company_name: 'John Brown',
    project_name: 32,
    status: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    company_name: 'Jim Green',
    project_name: 42,
    status: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    company_name: 'Joe Black',
    project_name: 32,
    status: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    company_name: 'Jim Red',
    project_name: 32,
    status: 'London No. 2 Lake Park',
  },
];

function onChange(pagination: any, filters: any, sorter: any, extra: any) {
  console.log('params', pagination, filters, sorter, extra);
}

export const SurveyTable: React.FC<any> = () => {
  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};
