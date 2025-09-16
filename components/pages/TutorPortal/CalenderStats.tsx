import RecentReviews from "./RecentReviews";
import StatsCard from "./StatsCard";
import UpcomingSessions from "./UpcomingSessions";

export default function CalenderStats() {
  return (
    <div className="space-y-8">
      <StatsCard />
      <UpcomingSessions />
      <RecentReviews/>
    </div>
  );
}
