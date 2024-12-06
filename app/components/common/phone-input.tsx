import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import { Input } from "@/app/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn("flex", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          defaultCountry="GH"
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
          {...props}
        />
      );
    }
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    className={cn("rounded-e-lg rounded-s-none", className)}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

export const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 focus:z-10"
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

export const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem className="gap-2" onSelect={() => onChange(country)}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(
        country
      )}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${
          country === selectedCountry ? "opacity-100" : "opacity-0"
        }`}
      />
    </CommandItem>
  );
};

export const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
export const countries: CountryEntry[] = [
  { label: "Afghanistan", value: "AF" },
  { label: "Albania", value: "AL" },
  { label: "Algeria", value: "DZ" },
  { label: "Andorra", value: "AD" },
  { label: "Angola", value: "AO" },
  { label: "Argentina", value: "AR" },
  { label: "Armenia", value: "AM" },
  { label: "Australia", value: "AU" },
  { label: "Austria", value: "AT" },
  { label: "Azerbaijan", value: "AZ" },
  { label: "Bahamas", value: "BS" },
  { label: "Bahrain", value: "BH" },
  { label: "Bangladesh", value: "BD" },
  { label: "Barbados", value: "BB" },
  { label: "Belarus", value: "BY" },
  { label: "Belgium", value: "BE" },
  { label: "Belize", value: "BZ" },
  { label: "Benin", value: "BJ" },
  { label: "Bhutan", value: "BT" },
  { label: "Bolivia", value: "BO" },
  { label: "Bosnia and Herzegovina", value: "BA" },
  { label: "Botswana", value: "BW" },
  { label: "Brazil", value: "BR" },
  { label: "Brunei", value: "BN" },
  { label: "Bulgaria", value: "BG" },
  { label: "Burkina Faso", value: "BF" },
  { label: "Burundi", value: "BI" },
  { label: "Cabo Verde", value: "CV" },
  { label: "Cambodia", value: "KH" },
  { label: "Cameroon", value: "CM" },
  { label: "Canada", value: "CA" },
  { label: "Central African Republic", value: "CF" },
  { label: "Chad", value: "TD" },
  { label: "Chile", value: "CL" },
  { label: "China", value: "CN" },
  { label: "Colombia", value: "CO" },
  { label: "Comoros", value: "KM" },
  { label: "Congo, Democratic Republic of the", value: "CD" },
  { label: "Congo, Republic of the", value: "CG" },
  { label: "Costa Rica", value: "CR" },
  { label: "Croatia", value: "HR" },
  { label: "Cuba", value: "CU" },
  { label: "Cyprus", value: "CY" },
  { label: "Czech Republic", value: "CZ" },
  { label: "Denmark", value: "DK" },
  { label: "Djibouti", value: "DJ" },
  { label: "Dominica", value: "DM" },
  { label: "Dominican Republic", value: "DO" },
  { label: "Ecuador", value: "EC" },
  { label: "Egypt", value: "EG" },
  { label: "El Salvador", value: "SV" },
  { label: "Equatorial Guinea", value: "GQ" },
  { label: "Eritrea", value: "ER" },
  { label: "Estonia", value: "EE" },
  { label: "Eswatini", value: "SZ" },
  { label: "Ethiopia", value: "ET" },
  { label: "Fiji", value: "FJ" },
  { label: "Finland", value: "FI" },
  { label: "France", value: "FR" },
  { label: "Gabon", value: "GA" },
  { label: "Gambia", value: "GM" },
  { label: "Georgia", value: "GE" },
  { label: "Germany", value: "DE" },
  { label: "Ghana", value: "GH" },
  { label: "Greece", value: "GR" },
  { label: "Grenada", value: "GD" },
  { label: "Guatemala", value: "GT" },
  { label: "Guinea", value: "GN" },
  { label: "Guinea-Bissau", value: "GW" },
  { label: "Guyana", value: "GY" },
  { label: "Haiti", value: "HT" },
  { label: "Honduras", value: "HN" },
  { label: "Hungary", value: "HU" },
  { label: "Iceland", value: "IS" },
  { label: "India", value: "IN" },
  { label: "Indonesia", value: "ID" },
  { label: "Iran", value: "IR" },
  { label: "Iraq", value: "IQ" },
  { label: "Ireland", value: "IE" },
  { label: "Israel", value: "IL" },
  { label: "Italy", value: "IT" },
  { label: "Jamaica", value: "JM" },
  { label: "Japan", value: "JP" },
  { label: "Jordan", value: "JO" },
  { label: "Kazakhstan", value: "KZ" },
  { label: "Kenya", value: "KE" },
  { label: "Kiribati", value: "KI" },
  { label: "Kuwait", value: "KW" },
  { label: "Kyrgyzstan", value: "KG" },
  { label: "Laos", value: "LA" },
  { label: "Latvia", value: "LV" },
  { label: "Lebanon", value: "LB" },
  { label: "Lesotho", value: "LS" },
  { label: "Liberia", value: "LR" },
  { label: "Libya", value: "LY" },
  { label: "Liechtenstein", value: "LI" },
  { label: "Lithuania", value: "LT" },
  { label: "Luxembourg", value: "LU" },
  { label: "Madagascar", value: "MG" },
  { label: "Malawi", value: "MW" },
  { label: "Malaysia", value: "MY" },
  { label: "Maldives", value: "MV" },
  { label: "Mali", value: "ML" },
  { label: "Malta", value: "MT" },
  { label: "Marshall Islands", value: "MH" },
  { label: "Mauritania", value: "MR" },
  { label: "Mauritius", value: "MU" },
  { label: "Mexico", value: "MX" },
  { label: "Micronesia", value: "FM" },
  { label: "Moldova", value: "MD" },
  { label: "Monaco", value: "MC" },
  { label: "Mongolia", value: "MN" },
  { label: "Montenegro", value: "ME" },
  { label: "Morocco", value: "MA" },
  { label: "Mozambique", value: "MZ" },
  { label: "Myanmar", value: "MM" },
  { label: "Namibia", value: "NA" },
  { label: "Nauru", value: "NR" },
  { label: "Nepal", value: "NP" },
  { label: "Netherlands", value: "NL" },
  { label: "New Zealand", value: "NZ" },
  { label: "Nicaragua", value: "NI" },
  { label: "Niger", value: "NE" },
  { label: "Nigeria", value: "NG" },
  { label: "North Korea", value: "KP" },
  { label: "North Macedonia", value: "MK" },
  { label: "Norway", value: "NO" },
  { label: "Oman", value: "OM" },
  { label: "Pakistan", value: "PK" },
  { label: "Palau", value: "PW" },
  { label: "Palestine", value: "PS" },
  { label: "Panama", value: "PA" },
  { label: "Papua New Guinea", value: "PG" },
  { label: "Paraguay", value: "PY" },
  { label: "Peru", value: "PE" },
  { label: "Philippines", value: "PH" },
  { label: "Poland", value: "PL" },
  { label: "Portugal", value: "PT" },
  { label: "Qatar", value: "QA" },
  { label: "Romania", value: "RO" },
  { label: "Russia", value: "RU" },
  { label: "Rwanda", value: "RW" },
  { label: "Saint Kitts and Nevis", value: "KN" },
  { label: "Saint Lucia", value: "LC" },
  { label: "Saint Vincent and the Grenadines", value: "VC" },
  { label: "Samoa", value: "WS" },
  { label: "San Marino", value: "SM" },
  { label: "Sao Tome and Principe", value: "ST" },
  { label: "Saudi Arabia", value: "SA" },
  { label: "Senegal", value: "SN" },
  { label: "Serbia", value: "RS" },
  { label: "Seychelles", value: "SC" },
  { label: "Sierra Leone", value: "SL" },
  { label: "Singapore", value: "SG" },
  { label: "Slovakia", value: "SK" },
  { label: "Slovenia", value: "SI" },
  { label: "Solomon Islands", value: "SB" },
  { label: "Somalia", value: "SO" },
  { label: "South Africa", value: "ZA" },
  { label: "South Korea", value: "KR" },
  { label: "South Sudan", value: "SS" },
  { label: "Spain", value: "ES" },
  { label: "Sri Lanka", value: "LK" },
  { label: "Sudan", value: "SD" },
  { label: "Suriname", value: "SR" },
  { label: "Sweden", value: "SE" },
  { label: "Switzerland", value: "CH" },
  { label: "Syria", value: "SY" },
  { label: "Taiwan", value: "TW" },
  { label: "Tajikistan", value: "TJ" },
  { label: "Tanzania", value: "TZ" },
  { label: "Thailand", value: "TH" },
  { label: "Timor-Leste", value: "TL" },
  { label: "Togo", value: "TG" },
  { label: "Tonga", value: "TO" },
  { label: "Trinidad and Tobago", value: "TT" },
  { label: "Tunisia", value: "TN" },
  { label: "Turkey", value: "TR" },
  { label: "Turkmenistan", value: "TM" },
  { label: "Tuvalu", value: "TV" },
  { label: "Uganda", value: "UG" },
  { label: "Ukraine", value: "UA" },
  { label: "United Arab Emirates", value: "AE" },
  { label: "United Kingdom", value: "GB" },
  { label: "United States", value: "US" },
  { label: "Uruguay", value: "UY" },
  { label: "Uzbekistan", value: "UZ" },
  { label: "Vanuatu", value: "VU" },
  { label: "Vatican City", value: "VA" },
  { label: "Venezuela", value: "VE" },
  { label: "Vietnam", value: "VN" },
  { label: "Yemen", value: "YE" },
  { label: "Zambia", value: "ZM" },
  { label: "Zimbabwe", value: "ZW" },
];
