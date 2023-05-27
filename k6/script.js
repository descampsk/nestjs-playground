import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  ext: {
    loadimpact: {
      projectID: 3641998,
      // Test runs with the same name groups test runs together
      name: 'demo-aws-app-runner',
      distribution: {
        'aws-eu-central-1': { loadZone: 'amazon:de:frankfurt', percent: 100 },
      },
    },
  },
  stages: [
    { duration: '4m', target: 20 },
    { duration: '2m', target: 20 },
    { duration: '20s', target: 0 },
  ],
};

const APP_RUNNER_URL = 'https://eav78szsmc.eu-west-1.awsapprunner.com';

export default function () {
  const limit = Math.floor(Math.random() * 100) * 200000;
  const res = http.get(`${APP_RUNNER_URL}/prime?limit=${limit}`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  if (res.status !== 200) {
    console.log('status', res.status, 'body', res.body);
  }
  sleep(1);
}
