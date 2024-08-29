import data from "../homePage/data"; 
import Card from "../../components/card/Card";

export default function DaftarCampaign() {
  return (
    <div className="mx-[80px] py-6">
      <h1 className="text-3xl font-bold font-Inter text-gray-600">
        Daftar <span className="text-primary">Campaign</span>
      </h1>
      <p className="text-sm">
        Pilih dan salurkan donasi kamu kedalam program yang sangat berarti bagi
        mereka
      </p>
      <div className="grid grid-cols-3 gap-6 mt-8">
        {data.map((item) => (
          <>
            <Card key={item.campaignCode} item={item} />
          </>
        ))}
      </div>
    </div>
  );
}
