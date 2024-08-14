export default function Profile({ params }: { params: { profile: string } }) {
  return <p>This is {params.profile} profile!</p>;
}
