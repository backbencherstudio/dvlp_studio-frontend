"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="account" className="">
        <div className="flex border items-center justify-between">
          <TabsList className="bg-white rounded-[14px] gap-1.5 p-2 w-[312px] h-[62px]">
            <TabsTrigger
              className="px-5 py-2.5 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white "
              value="account"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              className="px-5 py-2.5 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white"
              value="password"
            >
              Password
            </TabsTrigger>
          </TabsList>

          <div>hb</div>
        </div>
        <TabsContent value="account">
          Make changes to your account here. Make changes to your account here.
          Make changes to your account here. Make changes to your account here.
          Make changes to your account here. Make changes to your account here.
          Make changes to your account here. Make changes to your account here.
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password"></TabsContent>

      </Tabs>
    </div>
  );
}


{/* <form
onSubmit={handleBookingSubmit(onBookingSubmit)}
className="space-y-4"
>
{/* Name */}

<CustomInputField
  label="Your Name"
  name="name"
  placeholder="Enter your name"
  register={registerBooking}
  errors={bookingErrors.name}
  required={true}
/>

{/* Subject */}
<CustomSelectField
  label="Subject"
  name="subject"
  register={registerBooking}
  control={bookingControl}
  options={[
    { label: "Math", value: "Math" },
    { label: "Science", value: "Science" },
  ]}
  required={true}
/>

<div className="flex flex-col sm:flex-row gap-4">
  {/* Date */}
  <div className="flex-1">
    <DatePickerField
      label="Date"
      name="date"
      register={registerBooking}
      control={bookingControl}
      required={true}
    />
  </div>

  <div className="flex-1">
    {/* Time */}
    <CustomTimePicker
      label="Time"
      name="time"
      register={registerBooking}
      control={bookingControl}
      required={true}
    />
  </div>
</div>

{/* Footer */}
<div className="mt-4 flex flex-col justify-between">
  <button
    type="submit"
    className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-5 py-2 rounded-lg hover:opacity-80  cursor-pointer"
  >
    Proceed to Payment
  </button>
  <button
    type="button"
    className="px-5 py-2 rounded-lg"
    onClick={() => setIsBookingModalOpen(false)}
  >
    Cancel
  </button>
</div>
</form> */}
