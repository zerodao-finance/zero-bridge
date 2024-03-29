export const CheckboxInput = ({ label, checked, onClick, disabled }) => {
  return (
    <div className={`flex gap-1 items-center`}>
      <input
        id="checkbox-input"
        type="checkbox"
        className={`${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        } opacity-0 absolute`}
        checked={checked}
        onChange={onClick}
        disabled={disabled}
      />
      <div
        class={`${
          disabled
            ? "bg-[rgb(200,200,200)] border-neutral-400"
            : "bg-neutral-100 border-zero-green-300 focus-within:border-zero-green-400"
        } border-2 rounded-md  w-5 h-5 flex flex-shrink-0 justify-center items-center`}
      >
        <svg
          class="fill-current hidden w-3 h-3 text-zero-green pointer-events-none"
          version="1.1"
          viewBox="0 0 17 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(-9 -11)" fill="#2D9E32" fill-rule="nonzero">
              <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
            </g>
          </g>
        </svg>
      </div>
      <label
        for="checkbox-input"
        className={`text-sm ${
          disabled ? "cursor-not-allowed text-neutral-400" : "cursor-pointer"
        }`}
      >
        {label}
      </label>
    </div>
  );
};
