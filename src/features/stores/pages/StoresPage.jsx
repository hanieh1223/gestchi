import Container from "../../../components/shared/Container.jsx";
import SectionHeading from "../../../components/shared/SectionHeading.jsx";
import StoreCard from "../../../components/shared/StoreCard.jsx";
import { stores } from "../../../data/demoData.js";

function StoresPage() {
  return <Container className="page-section"><SectionHeading title="فروشگاه‌های قسط‌یار" description="هر فروشگاه روش‌های خرید و شرایط اختصاصی خودش را دارد." /><div className="store-grid">{stores.map((store) => <StoreCard key={store.id} store={store} />)}</div></Container>;
}

export default StoresPage;
