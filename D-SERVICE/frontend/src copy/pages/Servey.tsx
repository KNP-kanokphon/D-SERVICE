import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Tabs } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { SurveyTable } from './survey-Table';
import { SurveyCreate } from './survey-Create';

const { TabPane } = Tabs;

export default (): React.ReactNode => {
  const intl = useIntl();

  return (
    <PageContainer>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Servey Form" key="1">
            <SurveyTable />
          </TabPane>
          <TabPane tab="Create Survey" key="2">
            <SurveyCreate />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};
