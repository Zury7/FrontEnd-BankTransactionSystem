import React from 'react';

import { getCustomers } from '../api/Customers';
import { Table } from 'antd';

export default function CustomerList() {
  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'CustomerID',
      key: 'CustomerID',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'DoB',
      dataIndex: 'dateofbirth',
      key: 'dateofbirth',
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        return Date.parse(a.dateofbirth) - Date.parse(b.dateofbirth);
      },
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
    },
  ];

  const [customers, setCustomers] = React.useState();

  // customer list is loaded on the first component render
  React.useEffect(() => loadCustomerList(), []);

  function loadCustomerList() {
    getCustomers()
      .then((data) => {
        setCustomers(data);
      })
      .catch((err) => console.log(err));
  }

  //loadCustomerList();
  //console.log(Customer);
  return (
    <div>
      <h1>Customer List</h1>

      {<Table dataSource={customers} columns={columns} />}
    </div>
  );
}