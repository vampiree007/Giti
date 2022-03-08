import ContainerComponent from "../container/container.component";
import StickyHeadTable from "../component/table/table.component";

// HOMEPAGE
const HomePage = () => {
  return (
    <div>
      <ContainerComponent header={true} sidebar={true}>
        <StickyHeadTable />
      </ContainerComponent>
    </div>
  );
};

export default HomePage;
