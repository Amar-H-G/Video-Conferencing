import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Loader from "../../components/ui/Loader";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
      <Card>
        <h1 className="text-xl font-bold mb-4">UI Components Preview</h1>

        <div className="space-y-4">
          <Input label="Email" placeholder="you@example.com" />
          <Input label="Meeting Code" placeholder="X7Q9-A2" />

          <div className="flex gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="dark">Dark</Button>
          </div>

          <Loader />
        </div>
      </Card>
    </div>
  );
}
