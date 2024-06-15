import {Accordion} from "flowbite-react";

const About = () => {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto ">
      <h1 className="text-slate-800 dark:text-white text-3xl font-bold mb-4">
        About TravelMaker
      </h1>
      <p className="mb-4 text-slate-700 dark:text-white">
        TravelMakel is a leading travel reservation firm that specializes in
        helping clients book, and rent properties in the most desirable
        neighborhoods. Our team of experienced agents is dedicated to providing
        exceptional service and making the buying and selling process as smooth
        as possible.
      </p>
      <p className="mb-4 text-slate-700 dark:text-white">
        Our mission is to help our clients achieve their travelling goals by
        providing expert advice, personalized service, and a deep understanding
        of the local market. Whether you are looking to buy, sell, or rent a
        property, we are here to help you every step of the way.
      </p>
      <p className="mb-4 text-slate-700 dark:text-white">
        Our team of agents has a wealth of experience and knowledge in the
        hospitality industry, and we are committed to providing the highest
        level of service to our clients. We believe that getting the best
        possible reservation for you should be an exciting and rewarding
        experience, and we are dedicated to making that a reality for each and
        every one of our clients.
      </p>
      <div className="mt-20">
        <p className=" text-lg md:text-2xl font-bold mb-4 ">
          Frequently Asked Question
        </p>
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>How can I book a reservation?</Accordion.Title>
            <Accordion.Content>
              Go to TravelMaker app, signup an account,book a reservation, and
              make payment using your payment card.
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Can I cancel my booking?</Accordion.Title>
            <Accordion.Content>
              Yes, you can cancel your booking. This has to be made 24 hours
              before check-in time. However all cancellation attracts £10
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Do you run airport shuttle?</Accordion.Title>
            <Accordion.Content>
              No, we do not run airport shuttle services. However, we work we
              companies that run shuttle services. This can be arranged on
              arrival.
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </div>
  );
};

export default About;
