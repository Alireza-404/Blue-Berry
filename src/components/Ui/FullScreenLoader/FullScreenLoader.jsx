import Loading from "../../../assets/images/loading.png";

export default function FullScreenLoader() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <img
        src={Loading}
        alt="Loading Image"
        className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
      />

      <div
        className="w-28 h-28 rounded-full border-dashed border-2 border-TB/15
                  dark:border-box-border-D loadingAnimation"
      ></div>
    </div>
  );
}
