import { Thumb } from './YouTube';

// Shorts are vertical: show the portrait frame over a blurred copy of itself.
// The parent must be `relative` with `overflow-hidden`.
export default function ShortCover({ id }: { id: string }) {
  return (
    <>
      <Thumb id={id} kind="short" className="absolute inset-0 size-full scale-125 object-cover opacity-60 blur-xl" />
      <span className="absolute inset-y-0 left-1/2 aspect-[9/16] -translate-x-1/2 overflow-hidden rounded-md">
        <Thumb id={id} kind="short" className="size-full object-cover" />
      </span>
    </>
  );
}
