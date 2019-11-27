import React from "react";
import { Modal, Alert, Tabs, Icon } from "antd";

const { TabPane } = Tabs;

const OutputModal = props => {
  let all = props.item.warning ? props.item.warning.split("\n") : [];

  all = all.filter(e => e && e.length > 0);
  const output = {
    all: all.map(item => <OutputAlert key={item} text={item} />),
    info: all
      .filter(item => !item.match(/(^warning|^error)/i))
      .map(item => <OutputAlert key={item} text={item} />),
    warnings: all
      .filter(item => item.match(/^warning/i))
      .map(item => <OutputAlert key={item} text={item} />),
    errors: all
      .filter(item => item.match(/^error/i))
      .map(item => <OutputAlert key={item} text={item} />)
  };
  return (
    <div>
      <Modal
        visible={props.visible}
        onCancel={() => {
          props.setVisible(false);
        }}
        footer={null}
      >
        <Tabs style={{ marginTop: "1rem" }} defaultActiveKey="0">
          <TabPane tab={<span>{`All ${output.all.length}`}</span>} key="0">
            {output.all}
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="info-circle" theme="twoTone" />
                {`Info ${output.info.length}`}
              </span>
            }
            key="1"
          >
            {output.info}
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="warning" theme="twoTone" twoToneColor="#e3ca57" />
                {`Warnings ${output.warnings.length}`}
              </span>
            }
            key="2"
          >
            {output.warnings}
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="close-circle" theme="twoTone" twoToneColor="red" />
                {`Errors ${output.errors.length}`}
              </span>
            }
            key="3"
          >
            {output.errors}
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

const OutputAlert = props => {
  const get_type = text => {
    if (text.match(/^error/i)) return "error";
    else if (text.match(/^warning/i)) return "warning";
    else return "info";
  };

  return (
    <Alert
      style={{ margin: "10px 0" }}
      message={props.text}
      type={get_type(props.text)}
      showIcon
    />
  );
};

export default OutputModal;
