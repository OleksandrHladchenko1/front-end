import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import drilldown from 'highcharts/modules/drilldown';
import HighchartsReact from "highcharts-react-official";
import { FormattedMessage, useIntl } from "react-intl";

import { APIInteractor } from '../../../services/apiInteractor';
import {
  prepareDataForHighcharts,
  prepareDataForProblems, prepareDrilldownData,
} from "../../../services/utils";

import "./StatisticsPage.scss";

export const StatisticsPage = () => {
  const intl = useIntl();
  const [workload, setWorkload] = useState([]);
  const [problems, setProblems] = useState([]);
  const [drillData, setDrillData] = useState([]);
  const apiInteractor = new APIInteractor();
  drilldown(Highcharts);

  useEffect(() => {
    apiInteractor.getWorkload().then(data => {
      setDrillData(prepareDrilldownData(data));
    });
    apiInteractor.getWorkload().then(data => {
      setWorkload(prepareDataForHighcharts(data));
    });
    apiInteractor.getProblemStatistics().then((data) => {
      const newData = data.map((item) => ({
        name: intl.formatMessage({ id: item.name }),
        y: item.count
      }));
      setProblems(newData);
    });
  }, []);

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
      <article className="statistics-workload">
        <HighchartsReact
          highcharts={Highcharts}
          options={optionsForWorkload}
        />
      </article>
      <article className="statistics-problems">
        <HighchartsReact
          highcharts={Highcharts}
          options={optionsForProblems}
        />
      </article>
    </main>
  );
};
