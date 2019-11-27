import React from "react";
import { Spin, Icon } from "antd";

export default function Loading() {
  return (
    <div style={{ width: "100%", textAlign: "center", height: "100px" }}>
      <Spin indicator={<Icon type="loading" style={{ fontSize: 26 }} spin />} />
    </div>
  );
}
