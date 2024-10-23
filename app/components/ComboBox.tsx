"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { Button } from "app/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "app/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "app/components/ui/popover"
import { cn } from "app/lib/utils"

export default function ComboboxCategories({ categories }: { categories: string[]  }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [customValue, setCustomValue] = React.useState("")

  const handleAddCustomCategory = () => {
    if (customValue && !categories.includes(customValue)) {
        setValue(customValue)
        setOpen(false)
    }
    }

  return (
    <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
  ? categories.find((category) => category === value) || customValue
  : "Select category..."}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
        <CommandInput 
            placeholder="Search or add a category..."
            value={customValue}
            onChangeCapture={(e) => setCustomValue((e.target as HTMLInputElement).value)} 
        />
          <CommandList>
            <CommandEmpty>No Category Found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category}
                </CommandItem>
              ))}
                <CommandItem
                    value={customValue}
                    onSelect={handleAddCustomCategory}
                >
                    <span>Add &quot;{customValue}&quot;</span>
                </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <input type="hidden" name="category" value={value} />
    </>
  )
}