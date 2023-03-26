import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  ext: {
    loadimpact: {
      projectID: 3632865,
      // Test runs with the same name groups test runs together
      name: 'demo-aws-app-runner',
      distribution: {
        'aws-eu-central-1': { loadZone: 'amazon:de:frankfurt', percent: 100 },
      },
    },
  },
  stages: [
    { duration: '4m', target: 50 },
    { duration: '2m', target: 50 },
    { duration: '20s', target: 0 },
  ],
};

const APP_RUNNER_URL = 'https://ktrhwr52ip.eu-west-1.awsapprunner.com';

export default function () {
  const res = http.get(`${APP_RUNNER_URL}/prime?limit=2000000`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  if (res.status !== 200) {
    console.log('status', res.status, 'body', res.body);
  }
  sleep(1);
}
