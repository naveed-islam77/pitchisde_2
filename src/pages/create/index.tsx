import LeftBar from "@/components/CreatePitch/LeftBar";
import Pitch from "@/components/CreatePitch/Pitch";
import RightBar from "@/components/CreatePitch/RightBar";
import { CreatePitchProvider } from "@/contexts/CreatePitch/CreatePitchContext";
import { AppLayout } from "@/layouts/AppLayout";

const CreatePitch = () => {
  return (
    <AppLayout>
      <CreatePitchProvider>
        <div className="w-full flex flex-col screen-1300:flex-row items-stretch justify-center gap-4 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-32 py-6">
          {/* LeftBar */}
          <div className="w-full screen-1300:w-[305px] hidden screen-1300:block">
            <LeftBar />
          </div>

          {/* Pitch */}
          <div className="w-full screen-1300:w-[623px]">
            <Pitch />
          </div>

          {/* RightBar */}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-4">
            <div className="w-full screen-1300:hidden">
              <LeftBar />
            </div>
            <div className="w-full screen-1300:w-[305px]">
              <RightBar />
            </div>
          </div>
        </div>
      </CreatePitchProvider>
    </AppLayout>
  );
};

export default CreatePitch;
