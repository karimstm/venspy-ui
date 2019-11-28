import { notification } from "antd";
import { DEFAULT_URL } from "../actions/types";
class connect {
  ws = null;
  timeout = 250;

  notify = (type, title, key, id, pk) => {
    notification[type]({
      key: key,
      message: title,
      onClick: () => {
        window.location.replace(`/projects/${pk}/results/${id}`);
      }
    });
  };

  connect = () => {
    this.ws = new WebSocket(
      "ws://" + DEFAULT_URL.substr(7) + "sockethandler/1/"
    );
    let that = this;
    var connectInterval;
    this.ws.onopen = () => {
      this.notify("success", "You are Connected", "connect");
      that.timeout = 250;
      clearTimeout(connectInterval);
    };
    this.ws.onmessage = event => {
      let data = JSON.parse(event.data);
      this.notify(
        data.status === "success" ? "success" : "error",
        data["message"],
        data.id + data.pk,
        data.id,
        data.pk
      );
    };
    this.ws.onclose = () => {
      this.notify(
        "warning",
        `Your Are Disconnected. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000
        )} second.`,
        "closed"
      );

      that.timeout = that.timeout + that.timeout;
      connectInterval = setTimeout(this.check, Math.min(10000, that.timeout));
    };

    this.ws.onerror = err => {
      this.notify("error", "Server encountered error", "error");
      this.ws.close();
    };
  };
  check = () => {
    if (!this.ws || this.ws.readyState === WebSocket.CLOSED) this.connect();
  };
}

export default new connect();
