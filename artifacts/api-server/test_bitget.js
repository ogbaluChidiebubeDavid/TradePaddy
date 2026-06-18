import { validateCredentials } from './src/lib/bitget.ts';


async function run() {
  const creds = {
    apiKey: 'bg_b158ad6ba8dbd3f92e0ea3aa45dce1cb',
    secretKey: '14d8b6817ef2a72659bc240c35c93cbfd7304c818dfde6addd85abc3da4131b3',
    passphrase: 'Chukstonydave'
  };
  
  try {
    console.log('Testing Bitget credentials...');
    const result = await validateCredentials(creds);
    console.log('Success! UID:', result.uid);
    console.log('Spot assets count:', result.spotAssets.length);
  } catch (err) {
    console.error('Error validating credentials:', err);
  }
}

run();
