import { launchList } from "@/api/product";
import LaunchDetail from "@/app/launch/detail/page";

export const generateStaticParams = async () => {
	const res = await launchList({});
	const paths = res.data.list.map((item: { name: any }) => ({
		id: item.name.toString(),
	}));
	return paths;
};

interface IBlogDetailParams {
	params: {
		id: string;
	};
}

const LearnDetail = (props: any) => {
	return <LaunchDetail id={props.params.id} />;
};

export default LearnDetail;
