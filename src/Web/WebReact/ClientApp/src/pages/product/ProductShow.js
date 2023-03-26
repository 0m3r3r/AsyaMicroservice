import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Widget from "../../components/Widget/Widget";

export const ProductShow = (items) => {
  useEffect(() => {
    // GetOrdersAtFirstİnitialize
    // seProduct([...products,items])
  }, []);

  const [products, setProducts] = useState(
        [{
          INTERNAL_REFERENCE: 110761,
          TYPE: 0,
          MASTER_CODE: "30232-K",
          GL_CODE1: "600.01.01",
          AUXIL_CODE: "LAZER",
          QUANTITY: 22,
          PRICE: 5.5,
          TOTAL: 121,
          VAT_RATE: 18,
          VAT_AMOUNT: 21.78,
          VAT_BASE: 121,
          TRANS_DESCRIPTION: "MANAVGAT / İSİMLER",
          UNIT_CODE: "ADET",
          UNIT_CONV1: 1,
          UNIT_CONV2: 1,
          ORDER_RESERVE: 1,
          TOTAL_NET: 121,
          DATA_REFERENCE: 110761,
          DETAILS: "",
          CAMPAIGN_INFOS: [{ CAMPAIGN_INFO: "" }],
          DEFNFLDS: "",
          MULTI_ADD_TAX: 0,
          EDT_CURR: 1,
          ORG_QUANTITY: 85,
          ORG_PRICE: 5.5,
          AUXIL_CODE2: "DEPO",
          RESERVE_DATE: "22.03.2023",
          RESERVE_AMOUNT: 22,
          GUID: "C2173BC5-B759-4C74-90E5-8680FAE2521A",
        }])

  return (
    <Widget>
      <Row>
        <Col>Kod</Col>
        <Col>Açıklama</Col>
        <Col>Miktar</Col>
        <Col>Birim</Col>
        <Col>Birim Fiyat</Col>
        <Col>Kdv</Col>
        <Col>Toplam Fiyat</Col>
        <Col>Tedarik</Col>
      </Row>
      <div className="widget-body undo_padding">
        <div className="list-group list-group-lg">
          {products.map((product) => (
            <button className="list-group-item text-left"
              key={product.GUID}
            >
              <div>
                <Row>
                  <Col>
                    <span className="thumb-sm float-left">

                        <i class="la la-arrow-right icon-7x"></i>
                   
                    </span>
                    <h6 className="m-0">{product.MASTER_CODE} </h6>
                  </Col>
                  <Col>
                    <p className="help-block text-ellipsis m-0">
                      {product.QUANTITY}
                    </p>
                  </Col>
                  <Col>
                    <p className="help-block text-ellipsis m-0">
                      {product.UNIT_CODE}
                    </p>
                  </Col>
                  <Col>
                    <p className="help-block text-ellipsis m-0">
                      {product.PRICE}
                    </p>
                  </Col>
                  <Col>
                    <p className="help-block text-ellipsis m-0">{product.VAT_AMOUNT}</p>
                  </Col>
                  <Col>
                    <p className="help-block text-ellipsis m-0">
                      {product.TOTAL}
                    </p>
                  </Col>
                  <Col>
                    <p className="help-block text-ellipsis m-0">
                      {product.AUXIL_CODE2}
                    </p>
                  </Col>
                </Row>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Widget>
  );
};
