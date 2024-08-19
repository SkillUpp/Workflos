import Image from "next/image";
import EmptyImage from "@/images/empty-list.svg";

const NoFound = (props: { title: string; message: string }) => {
  return (
    <div className={` flex flex-col items-center justify-center mt-12`}>
      <Image
        src={EmptyImage}
        alt=""
        width={128}
        height={128}
        className="mb-4"
      />
      <h4 className="text-lg font-blod text-[#222222]">
        {props.title || "No communities yet..."}
      </h4>
      <p className="text-sm text-gray-600">{props.message || "No data"}</p>
    </div>
  );
};

export default NoFound;
