import React, {useState} from "react";
import classes from "./ResultsCard.module.css";
import { Icon, Divider, Tag, Col, Modal, Alert } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import OutputModal from "./OutputModal";

export default function ResultsCard(props) {

	const [isOutputModalVisible, setIsOutputModalVisible] = useState(false);

	const Description = () => {
		Modal.info({
			title: "Description",
			content: props.item.description
				? props.item.description
				: "No Description",
			width: "40%"
		});
	};
	return (
		<div className={classes.ResultCard}>
			<div className={classes.ResultCardRow}>
				<Icon type="user" className={classes.ResultCardIcon} />
				<Divider type="vertical" />
				<span>username</span>
				<span onClick={() => setIsOutputModalVisible(true)}>
					{props.item.warning ? (
						<Icon type="warning" className={classes.icon} />
					) : (
							""
						)}
				</span>
				<span onClick={() => Description()}>
					<Icon type="profile" className={classes.iconabs} />
				</span>
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
						<Tag
							color="#f6feed"
							style={{ color: "#19bc9b", border: "1px solid #19bc9b" }}
						>
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
				<Col>
					<Link
						disabled={!props.item.status}
						to={`/projects/${props.id}/results/${props.item.id}`}
						className={`btn btn-outline-primary ResultCardButton btn-sm ${classes.ResultCardButton}`}
					>
						Show Result
          </Link>
				</Col>
			</div>
			<OutputModal visible={isOutputModalVisible} setVisible={setIsOutputModalVisible} {...props} />
		</div>
	);
}
