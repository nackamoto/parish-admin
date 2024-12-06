interface ComponentProps {
  errors?: string[] | undefined;
  icon?: React.ReactNode;
}
const defaultIcon = (
  <svg
    className="w-5 h-5 text-rose-600"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);
export default function FieldErrorsCard({
  errors,
  icon = defaultIcon,
}: ComponentProps) {
  return (
    <ul className="flex flex-col space-y-1 w-96">
      {errors?.map((error) => (
        <li key={error} className="flex flex-row space-x-2 items-center">
          {icon}
          <p className="text-gray-800 dark:text-white text-sm font-medium">
            {error}
          </p>
        </li>
      ))}
    </ul>
  );
}
