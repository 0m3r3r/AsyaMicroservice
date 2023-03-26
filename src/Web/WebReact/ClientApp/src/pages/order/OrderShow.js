import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";

export const OrderShow = () => {
  useEffect(() => {
    setFilteredOrder(orders)
  }, []);

  const [orders, setOrders] = useState([
    {
      INTERNAL_REFERENCE: "60486",
      NUMBER: 2301939,
      DATE: "22.03.2023",
      TIME: 151398177,
      AUXIL_CODE: "SERKAN",
      ARP_CODE: "120 S002",
      GL_CODE: "120.S002",
      TOTAL_DISCOUNTED: 121,
      TOTAL_VAT: 21.78,
      TOTAL_GROSS: 121,
      TOTAL_NET: 142.78,
      PRINT_COUNTER: 1,
      PRINT_DATE: "22.03.2023",
      ORDER_STATUS: 1,
      CREATED_BY: 14,
      DATE_CREATED: "22.03.2023",
      HOUR_CREATED: 9,
      MIN_CREATED: 8,
      SEC_CREATED: 59,
      CURRSEL_TOTAL: 1,
      DATA_REFERENCE: 60486,
      TRANSACTIONS: {
        TRANSACTION: [
          {
            INTERNAL_REFERENCE: 110680,
            TYPE: 0,
            MASTER_CODE: "355008-Sİ",
            GL_CODE1: "",
            AUXIL_CODE: "LAZER",
            QUANTITY: 50,
            PRICE: 172,
            TOTAL: 8600,
            VAT_RATE: 18,
            VAT_AMOUNT: 0,
            VAT_BASE: 0,
            TRANS_DESCRIPTION: "Atlas/İsimler",
            UNIT_CODE: "",
            UNIT_CONV1: 0,
            UNIT_CONV2: 0,
            ORDER_RESERVE: 0,
            TOTAL_NET: 0,
            DATA_REFERENCE: 0,
            DETAILS: "",
            CAMPAIGN_INFOS: [{ CAMPAIGN_INFO: "" }],
            DEFNFLDS: "",
            MULTI_ADD_TAX: 0,
            EDT_CURR: 0,
            ORG_QUANTITY: 0,
            ORG_PRICE: 0,
            AUXIL_CODE2: "DEPO",
            RESERVE_DATE: "",
            RESERVE_AMOUNT: 0,
            GUID: "",
          },
        ],
      },
      ORGLOGOID: "",
      DEFNFLDSLIST: "",
      AFFECT_RISK: 0,
      GUID: "0B44F2CD-B631-409D-8DA0-B425BAAF956A",
      DEDUCTIONPART1: 2,
      DEDUCTIONPART2: 3,
      LABEL_LIST: "",
    },
  ]);

  const [filteredOrder, setFilteredOrder] = useState([])
  

 const handleSearch=(event)=>{
    if (event.target.value==="") {
      setFilteredOrder(orders)
    } else {
      setFilteredOrder(orders.filter(orders=>orders.NUMBER.toString().toLowerCase().includes(event.target.value.toLowerCase())))
    }
  }

 

  const getCustomer = (ORDER_NUMBER) => {
    //Get Customer Infos
    //And return customer.TITLE

    var customerTitle = "SINAV BASIN YAIN DAĞ.ORG.SAN VE TİC.A.Ş";
    return customerTitle;
  };

  return (
    <Widget
      title={
        <h6>
          <Link
            to="/app/order/createorder"
            className="badge badge-success mr-2"
          >
            +Yeni
          </Link>
          Siparişler
        </h6>
      }
      refresh
    >
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Fiş No</th>
            <th>Müşteri</th>
            <th>Açıklama</th>
            <th>Oluşturulma Tarihi</th>
            <th>Teslim Tarihi</th>
            <th>Oluşturan</th>
            <th>Durum</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrder.map((order,index) => (
            <tr key={index}>
              <th scope="row">
                <Link
                  className="badge badge-info mr-2"
                  to={{
                    pathname: "/app/order/detailorder",
                    state: { order }
                  }}
                >
                  Detay
                </Link>
              </th>
              <td>
                <h6 className="m-0">{order.NUMBER} </h6>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">
                  {getCustomer(order.NUMBER)}
                </p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">
                  {order.TRANSACTIONS.TRANSACTION[0].TRANS_DESCRIPTION}
                </p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">
                  {order.DATE_CREATED}
                </p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">{order.DATE}</p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">
                  {order.AUXIL_CODE}
                </p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">BAŞLADI</p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <footer className="bg-widget-transparent mt">
        <input
          type="search"
          className="form-control form-control-sm bg-custom-dark border-0"
          placeholder="Search"
          onChange={handleSearch}
        />
      </footer>
    </Widget>
  );
};
