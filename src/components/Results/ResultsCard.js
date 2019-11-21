import React from "react";
import classes from "./ResultsCard.module.css";
import { Icon, Divider, Tag } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

export default function ResultsCard(props) {
  return (
    <div className={classes.ResultCard}>
      <div className={classes.ResultCardRow}>
        <Icon type="user" className={classes.ResultCardIcon} />
        <Divider type="vertical" />
        <span>username</span>
      </div>
      <div className={classes.ResultCardRow}>
        <Icon type="calendar" className={classes.ResultCardIcon} />
        <Divider type="vertical" />
        <span>
          {moment(props.item.dateCreation).format("YYYY-MM-DD HH:mm")}
        </span>
      </div>
      <div className={classes.ResultCardRow}>
        <Icon type="poweroff" className={classes.ResultCardIcon} />
        <Divider type="vertical" />
        <span>
          {props.item.status ? (
            <Tag color="green">
              <Icon
                type="check-circle"
                theme="filled"
                style={{ margin: "0 5px", top: "-2px", position: "relative" }}
              />
              Available
            </Tag>
          ) : (
            <Tag color="red">
              <Icon
                type="exclamation-circle"
                theme="filled"
                style={{ margin: "0 5px", top: "-2px", position: "relative" }}
              />
              Pending
            </Tag>
          )}
        </span>
      </div>
      <div className={classes.ResultCardRow}>
        <Link
          disabled={!props.item.status}
          to={`/projects/${props.id}/results/${props.item.id}`}
          className={`btn btn-outline-primary ResultCardButton btn-sm ${classes.ResultCardButton}`}
        >
          Show Result
        </Link>
      </div>
    </div>
  );
}
