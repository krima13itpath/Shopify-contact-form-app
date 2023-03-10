import { useCallback, useState } from "react";
import {
  Card,
  Heading,
  Icon,
  Layout,
  Page,
  Select,
  Stack,
  TextContainer,
} from "@shopify/polaris";
import Chart from "react-apexcharts";
import { NoteMajor } from "@shopify/polaris-icons";
import styles from "./Dashboard.module.css";

const defaultData = [
  { id: 1, x: 5, y: 10 },
  { id: 2, x: 10, y: 11 },
  { id: 3, x: 15, y: 15 },
  { id: 4, x: 20, y: 13 },
  { id: 5, x: 25, y: 17 },
  { id: 6, x: 30, y: 12 },
];

function Dashboard() {
  const [selected, setSelected] = useState("Select an option");

  const [options, setOptions] = useState({
    chart: {
      id: "Chart",
    },
    xaxis: {
      categories: [...defaultData.map((item, idx) => item.x)],
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    legend: {
      showForSingleSeries: true,
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Jan 2023",
      data: [...defaultData.map((item, idx) => item.y)],
    },
  ]);

  const filterOptions = [
    { label: "Last 7 day", value: "last week" },
    { label: "Monthly", value: "monthly" },
    { label: "Custom Date", value: "custom date" },
  ];

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  return (
    <Page fullWidth>
      <div className={styles.dropdownSection}>
        <Heading>Dashboard</Heading>
        <Select
          options={filterOptions}
          onChange={handleSelectChange}
          value={selected}
        />
      </div>
      <div className={styles.layoutContainer}>
        <Layout>
          <div className={styles.card}>
            <Layout.Section>
              <Card sectioned>
                <div className={styles.submissions}>
                  <Icon source={NoteMajor} color="base" />
                  <Heading>Submissions</Heading>
                </div>
                <Chart
                  options={options}
                  series={series}
                  type="line"
                  width={500}
                  height={320}
                />
              </Card>
            </Layout.Section>
          </div>
          <div>
            <Layout.Section secondary>
              <Card sectioned>
                <div className={styles.submissions}>
                  <Icon source={NoteMajor} color="base" />
                  <Heading>Total Submissions</Heading>
                </div>
                <TextContainer>
                  <p className={styles.totalSubmission}>1012</p>
                </TextContainer>
              </Card>
            </Layout.Section>
          </div>
        </Layout>
      </div>
    </Page>
  );
}

export default Dashboard;
