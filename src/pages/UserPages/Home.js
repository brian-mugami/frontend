import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useRouteLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { TabList, Tab, TabGroup, TabPanels, TabPanel } from "@tremor/react";
import Kd from "../../components/assets/ktslogo.png";
import screenshot from "../../components/assets/screenshot.png";
import LandingPageCards from "../../components/LayoutComponents/LandingPageCards";
import "./Home.css";
import LandingPageChart from "../../components/LayoutComponents/LandingPageChart";

const navigation = [
  { name: "Pricing", href: "" },
  { name: "Features", href: "#" },
];
const includedFeatures = [
  "Private forum access",
  "Member resources",
  "Entry to annual conference",
  "Official member t-shirt",
];

export default function HomePage() {
  const { token } = useRouteLoaderData("root");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="isolate bg-white">
      <div className="absolute overflow-hidden blur-3xl">
        <svg className="motion-effect" viewBox="0 0 1155 678">
          <path
            fill="url(#gradient)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-20" src={Kd} alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              to="/auth?mode=login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-16" src={Kd} alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    to="/auth?mode=login"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-4 max-w-2xl py-12 sm:py-24 lg:py-24">
            <div className="text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-2xl">
                Effortlessly Manage Your Inventory and Customers
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Introducing the ultimate solution for managing your inventory
                and customer relationships! Our Inventory CRM app streamlines
                your operations and helps you stay on top of your business.
              </p>
              <div className="mt-10 flex items-center justify-left gap-x-6">
                <Link
                  to="/auth?mode=login"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </Link>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div className="py-12">
            <LandingPageChart />
          </div>
          <div>
            <div className="b py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Financial Freedom, Simplified.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Simplify money management with tools that empower you to
                    take control of your money and pave the way to prosperity.
                  </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                  <div className="p-8 sm:p-10 lg:flex-auto">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                      What's included in the subscription?
                    </h3>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                      Kindred Inventory System is the inventory management
                      platform for the 21st century, get tailored support and
                      suggestions to grow your earning potential.
                    </p>
                    <div className="mt-10 flex items-center gap-x-4">
                      <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                        What’s included
                      </h4>
                      <div className="h-px flex-auto bg-gray-100" />
                    </div>
                    <ul
                      role="list"
                      className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                    >
                      {includedFeatures.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            className="h-6 w-5 flex-none text-indigo-600"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                    <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                      <div className="mx-auto max-w-xs px-8">
                        <p className="text-base font-semibold text-gray-600">
                          Easy Payement
                        </p>
                        <div className="pt-4 justify-center items-center">
                          <TabGroup>
                            <TabList className="justify-center items-center border-none">
                              <Tab>On premise</Tab>
                              <Tab>On cloud</Tab>
                            </TabList>
                            <TabPanels>
                              <TabPanel>
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                                    Ksh.5,000
                                  </span>
                                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                                    Monthly
                                  </span>
                                </p>
                              </TabPanel>
                              <TabPanel>
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                                    Ksh.3,000
                                  </span>
                                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                                    Monthly
                                  </span>
                                </p>
                              </TabPanel>
                            </TabPanels>
                          </TabGroup>
                        </div>

                        <a
                          href="mailto:kindredsolutions254@gmail.com"
                          className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Get access
                        </a>
                        <p className="mt-6 text-xs leading-5 text-gray-600">
                          Invoices and receipts available for easy company
                          reimbursement.Note that On premise option requires
                          additional costs for Hardware.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section" id="contact">
            <div className="text-center max-w-[600px] mx-auto">
              <div className="sm:text-3xl text-2xl font-bold mb-5">
                Subscribe Newsletter
              </div>
              <p className="text-sm leading-7 text-gray">
                Subscribe to our newsletter and never miss out on the latest
                inventory management tips, financial insights, and exclusive
                offers. Join our community of business owners and professionals
                who are taking their inventory and financial management to the
                next level.{" "}
              </p>
              <motion.form
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-5"
              >
                <input
                  type="text"
                  placeholder="Enter your email address"
                  className="sm:p-3 p-2 border-gray-200 text-sm shadow-md sm:w-72 w-60"
                />
                <button className="text-sm text-white bg-Teal sm:p-3 p-2 bg-indigo-600 shadow-md font-bold">
                  Subscribe
                </button>
              </motion.form>
            </div>
          </div>

          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
