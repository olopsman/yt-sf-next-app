import jsforce from "jsforce";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("salesforce_access_token")?.value;
  const instanceUrl = cookieStore.get("salesforce_instance_url")?.value;
  let result;
  try {
    const conn = new jsforce.Connection({
      instanceUrl: instanceUrl,
      accessToken: accessToken,
    });

    result = await conn.query("SELECT Id, Name FROM Account LIMIT 15");
  } catch (err) {
    console.log(err);
    return <div>Failed to fetch data from Salesforce</div>;
  }
  return (
    <div>
      Web server flow
      <ul className="list-disc list-inside">
        {result.records.map((record) => (
          <li key={record.Id}>{record.Name}</li>
        ))}
      </ul>
    </div>
  );
}
