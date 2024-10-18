import './App.css'
import { IntersectionObserverList } from './components/intersectionObserverList';
import { EventListenerList } from './components/eventListenerList';
import { Tabs, Box } from "@radix-ui/themes";

function App() {

  return (
    <>
      <Tabs.Root defaultValue="eventListener">
        <Tabs.List>
          <Tabs.Trigger value="eventListener">Event Listener</Tabs.Trigger>
          <Tabs.Trigger value="intersectionObserver">Intersection Observer</Tabs.Trigger>
        </Tabs.List>
        <Box pt="3">
          <Tabs.Content value="eventListener">
            <EventListenerList />

          </Tabs.Content>

          <Tabs.Content value="intersectionObserver">
            <IntersectionObserverList />

          </Tabs.Content>

        </Box>
      </Tabs.Root>
    </>
  )
}

export default App
