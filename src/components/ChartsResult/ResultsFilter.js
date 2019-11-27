import React, { useState, useEffect, useContext } from "react";
import { TreeSelect } from "antd";
import axios from "../../services/axios-default";
import { ChartsContext } from "./ChartsMain";
// import { ChartsContext } from "./DnDCharts";

// const { SHOW_PARENT } = TreeSelect;

export default function ResultsFilter(props) {
  const [treeData, setTreeData] = useState();
  const [isloaded, setIsloaded] = useState(false);
  const { graphs, setGraphs } = useContext(ChartsContext);
  const mydict = [
    {
      name: "Stock",
      value: "Stock"
    },
    {
      name: "Transfert",
      value: "Trasféré"
    },
    {
      name: "Production",
      value: "Production"
    },
    {
      name: "Chargement",
      value: "Chargé"
    },
    {
      name: "Besoin",
      value: "Besoin"
    },
    {
      name: "Consommation",
      value: "Consommation"
    },
    {
      name: "Consommation",
      value: "consommé"
    }
  ];
  useEffect(() => {
    // console.log("sd");
    axios
      .get(`/simulations/${props.project}/?id=${props.id}&var=all`)
      .then(res => {
        setTreeData(toCascaderData(res.data));
        setIsloaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const toCascaderData = data => {
    return mydict.map(dict => ({
      title: dict.name,
      value: dict.value,
      // key: dict,
      children: data
        .filter(r => r.toLowerCase().includes(dict.value.toLowerCase()))
        .map(elem => ({
          title: elem,
          value: elem,
          key: elem
        }))
    }));
  };

  const onChange = value => {
    // console.log("onChange ", value);
    setGraphs(value);
    // this.setState({ value });
  };

  if (!isloaded) return <div>loading</div>;
  else {
    // const res = filters.filter(r => r.toLowerCase().startsWith("stock"));
    const tProps = {
      treeData,
      // value: this.state.value,
      onChange: onChange,
      treeCheckable: true,
      allowClear: true,
      // showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: "Please select",
      style: {
        width: "100%"
      }
    };

    return (
      <div>
        <TreeSelect {...tProps} />
      </div>
    );
  }
}
