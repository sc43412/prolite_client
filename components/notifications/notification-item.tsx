export type Notification = {
  title: string;
  type: string;
  description?: string;
  background_color?: string;
};

interface NotificationItemProps {
  data: Notification;
}

export const NotificationItem = ({ data }: NotificationItemProps) => {
  return (
    <div className="flex h-8 w-full gap-2 font-medium items-top">
      <div
        className="min-w-[30px] size-[30px] rounded-full flex items-center justify-center p-2"
        style={{ backgroundColor: data.background_color }}
      >
        <span className="capitalize">{data.type.charAt(0)}</span>
      </div>
      <div className="flex flex-col justify-between">
        <span className="font-medium text-xs">{data.title}</span>
        <span className="text-xs text-[#9E9E9E]">
          {data.description || "No additional information"}
        </span>
      </div>
    </div>
  );
};
