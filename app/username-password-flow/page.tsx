import jsforce from "jsforce";

export default async function Page() {
  const conn = new jsforce.Connection({
    oauth2: {
      // you can change loginUrl to connect to sandbox or prerelease env.
      // loginUrl : 'https://test.salesforce.com',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    },
  });

  await conn.login(process.env.USERNAME!, process.env.PASSWORD!);

  const result = await conn.query("SELECT Id, Name FROM Account LIMIT 15");

  return (
    <div>
      Username Password Page
      <ul className="list-disc list-inside">
        {result.records.map((record) => (
          <li key={record.Id}>{record.Name}</li>
        ))}
      </ul>
    </div>
  );
}
