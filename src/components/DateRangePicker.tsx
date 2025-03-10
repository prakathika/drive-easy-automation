
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  onChange: (dates: { from: Date | undefined; to: Date | undefined }) => void;
  initialDateRange?: DateRange;
  disabled?: boolean;
}

export function DateRangePicker({
  onChange,
  initialDateRange,
  disabled = false,
}: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange>(initialDateRange || { 
    from: undefined, 
    to: undefined 
  });

  useEffect(() => {
    if (initialDateRange) {
      setDate(initialDateRange);
    }
  }, [initialDateRange]);

  const handleDateChange = (range: DateRange | undefined) => {
    if (range) {
      setDate(range);
      // Pass the range to the parent component ensuring the expected format
      onChange({ 
        from: range.from, 
        to: range.to 
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            disabled && "cursor-not-allowed opacity-50"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={handleDateChange}
          numberOfMonths={2}
          disabled={(date) => {
            // Disable dates in the past
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
          }}
          className="p-3 pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
}
