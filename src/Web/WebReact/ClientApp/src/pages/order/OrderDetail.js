import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Table } from "reactstrap";
import Widget from "../../components/Widget/Widget";

export const OrderDetail = (props) => {
    let { state } = useLocation();
    

  const getItem = (PRODUCT_NUMBER) => {
    //Get Customer Infos
    //And return customer.TITLE

    var itemCode = "METAL KALEM";
    return itemCode;
  };
  const getCustomer = (ORDER_NUMBER) => {
    //Get Customer Infos
    //And return customer.TITLE

    var customerTitle = "SINAV BASIN YAIN DAĞ.ORG.SAN VE TİC.A.Ş";
    return customerTitle;
  };

  return (
   <div>
     <Widget  
     title={
        <div>
          <Link
            to={{
                pathname: "/app/order/createorder",
                state: { state }
              }}
            className="badge badge-success mr-2"
          >
            Düzenle
          </Link>
        </div>
      }
      refresh
      >
      <Table bordered>
        <thead>
          <tr>
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

            <tr key={state.order.NUMBER}>
            
              <td>
                <h6 className="m-0">{state.order.NUMBER} </h6>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">
                  {getCustomer(state.order.NUMBER)}
                </p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">
                  {state.order.TRANSACTIONS.TRANSACTION[0].TRANS_DESCRIPTION}
                </p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">
                  {state.order.DATE_CREATED}
                </p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">{state.order.DATE}</p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">
                  {state.order.AUXIL_CODE}
                </p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">BAŞLADI</p>
              </td>
            </tr>
        </tbody>
      </Table>
    </Widget>
 
    <Widget
      title={
        <h6>
          Ürünler
        </h6>
      }

    >
      <Table bordered>
        <thead>
          <tr>
            <th>Kod</th>
            <th>Açıklama</th>
            <th>Miktar</th>
            <th>Birim Fiyatı</th>
            <th>Kdv</th>
            <th>Toplam Fiyat</th>
            <th>Birim</th>
            <th>Durum</th>
          </tr>
        </thead>

        <tbody>
          {state.order.TRANSACTIONS.TRANSACTION.map((product,index) => (
            <tr key={index}>
              <td>
                <h6 className="m-0">{product.MASTER_CODE} </h6>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">
                  {getItem(product.INTERNAL_REFERENCE)}
                </p>
              </td>

              <td>
                <p className="help-block text-ellipsis m-0">
                  {product.QUANTITY}
                </p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">{product.PRICE}</p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">
                  {"%"+product.VAT_RATE}
                </p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">{product.TOTAL}</p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">
                  {product.AUXIL_CODE}
                </p>
              </td>
              <td>
                <p className="help-block text-ellipsis m-0">BİTTİ</p>
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
        />
      </footer>
    </Widget>
   </div>
  );
};
