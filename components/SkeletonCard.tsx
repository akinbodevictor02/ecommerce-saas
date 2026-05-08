import Skeleton from "./Skeleton";

export default function SkeletonCard() {
  return (
    <div className="card p-6">
      <Skeleton className="h-3 w-24 mb-3" />
      <Skeleton className="h-6 w-32" />
    </div>
  );
}