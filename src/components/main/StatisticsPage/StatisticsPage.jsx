import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import drilldown from 'highcharts/modules/drilldown';
import HighchartsReact from "highcharts-react-official";
import { useIntl } from "react-intl";

import { Button } from "../../common/Button";

import { APIInteractor } from '../../../services/apiInteractor';
import {
  prepareDataForHighcharts,
  prepareDrilldownData,
} from "../../../services/utils";

import "./StatisticsPage.scss";

export const StatisticsPage = () => {
  const intl = useIntl();
  const [workload, setWorkload] = useState([]);
  const [problems, setProblems] = useState([]);
  const [drillData, setDrillData] = useState([]);
  const [isWorkloadVisible, setIsWorkloadVisible] = useState({
    isVisible: true,
    text: 'Problems',
  });
  const apiInteractor = new APIInteractor();
  drilldown(Highcharts);

  const getWorkloadData = () => {
    apiInteractor.getWorkload().then(data => {
      console.log(data);
      setDrillData(prepareDrilldownData(data));
    });
    apiInteractor.getWorkload().then(data => {
      setWorkload(prepareDataForHighcharts(data));
    });
  };

  const getProblemsData = () => {
    apiInteractor.getProblemStatistics().then((data) => {
      const newData = data.map((item) => ({
        name: intl.formatMessage({ id: item.name }),
        y: item.count
      }));
      setProblems(newData);
    });
  };

  useEffect(() => {
    getWorkloadData();
  }, []);

  const changeStatistics = () => {
    if(isWorkloadVisible.isVisible) {
      setIsWorkloadVisible({
        text: 'Workload',
        isVisible: false,
      });
      getProblemsData();
    } else {
      setIsWorkloadVisible({
        text: 'Problems',
        isVisible: true,
      });
      getWorkloadData();
    }
  };

  useEffect(() => {
    console.log(workload);
  });

  const optionsForWorkload = {
    chart: {
      type: 'column'
    },
    title: {
      align: 'center',
      text: intl.formatMessage({ id: "statistics.workload.title" })
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: intl.formatMessage({ id: "statistics.workload.totalHours.title" })
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: `{point.y:.1f} ${intl.formatMessage({ id: "statistics.workload.hours" })}`
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: `<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> ${intl.formatMessage({ id: "statistics.workload.hours.total" })}<br/>`
    },
    series: [{
      name: intl.formatMessage({ id: "statistics.workload" }),
      colorByPoint: true,
      data: workload,
    }],
    drilldown: {
      breadcrumbs: {
        position: {
          align: 'right'
        }
      },
      series: drillData,
    },
  };

  const optionsForProblems = {
    chart: {
      type: 'column'
    },
    title: {
      align: 'center',
      text: intl.formatMessage({ id: "statistics.problems.title" })
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: intl.formatMessage({ id: "statistics.problems.totalTimes.title" })
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y}'
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: `<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> ${intl.formatMessage({ id: "statistics.problems.times.total" })}<br/>`
    },
    series: [{
      name: "Problems",
      colorByPoint: true,
      data: problems,
    }],
  };

  return (
    <main className="statistics">
      { isWorkloadVisible.isVisible &&
        <article className="statistics-workload">
          <HighchartsReact
            highcharts={Highcharts}
            options={optionsForWorkload}
          />
        </article>
      }
      { !isWorkloadVisible.isVisible &&
      <article className="statistics-problems">
        <HighchartsReact
          highcharts={Highcharts}
          options={optionsForProblems}
        />
      </article>
      }
      <div className="button-container">
        <Button
          className="button-switch success"
          text={isWorkloadVisible.text}
          onClick={changeStatistics}
        />
      </div>
    </main>
  );
};
