import React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import DashboardLayout from '../../layouts/DashboardLayout'
import Button from '../../components/Button'

export default function Profile() {
  const router = useRouter()
  const { username } = router.query
  console.log(username)
  const publicProfile = useSWR(`/api/user/current`);
  console.log(publicProfile.data);
  const symbols = [
    {
      symbol: "USDT",
      expand_lots: 1,
      price: 7331.21,
      change: 0.42,
      Total_gain: 0.42,
      Day_gain: 0.42,
      open: 0.42,
      general: {
        symbol: "FTSE 100 INDEX",
        expand_lots: 1,
        price: 11.35,
        change: 30.89,
        Total_gain: 30.89,
        Day_gain: 30.89,
      }
    },
  ]
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-full lg:px-8">
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                className="h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
              <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{publicProfile.firstName} {publicProfile.lastName}</h1>
            <p className="text-sm font-medium text-gray-500">
              @{publicProfile.username}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <Button
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >
            Subscribe
          </Button>

        </div>
      </div>

      <div className="mt-8 mx-auto sm:px-6 w-full lg:grid-flow-col-dense lg:max-w-full lg:grid-cols-3">


        <section aria-labelledby="watchlist-title" className="">
          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <div className="flex flex-col mt-16">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="border-2 px-6 py-3 text-left text-xs font-normal uppercase tracking-wider"
                          >
                            SYMBOL
                          </th>
                          <th
                            scope="col"
                            className="border-2 px-6 py-3 text-left text-xs font-normal uppercase tracking-wider"
                          >
                            EXPAND LOTS
                          </th>
                          <th
                            scope="col"
                            className="border-2 px-6 py-3 text-left text-xs font-normal uppercase tracking-wider"
                          >
                            PRICE
                          </th>
                          <th
                            scope="col"
                            className="border-2 px-6 py-3 text-left text-xs font-normal uppercase tracking-wider"
                          >
                            CHANGE
                          </th>
                          <th
                            scope="col"
                            className="border-2 px-6 py-3 text-left text-xs font-normal uppercase tracking-wider"
                          >
                            TOTAL GAIN
                          </th>
                          <th
                            scope="col"
                            className="border-2 px-6 py-3 text-left text-xs font-normal uppercase tracking-wider"
                          >
                            1D GAIN
                          </th>
                          <th
                            scope="col"
                            className="border-2 px-6 py-3 text-left text-xs font-normal uppercase tracking-wider"
                          >
                            OPEN

                          </th>

                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {symbols.map((symbol) => (
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="font-semibold">
                                    {symbol.symbol}
                                  </div>
                                  <div className="text-sm text-gray-500">{symbol.general.symbol}</div>

                                </div>

                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">

                                <div className="">
                                  <div className="">{symbol.expand_lots} Lot</div>
                                  <div className="text-sm text-gray-500">{symbol.general.expand_lots} Share</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">

                                <div className="">
                                  <div className="">{symbol.price}</div>
                                  <div className="text-sm text-gray-500">{symbol.general.price}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">

                                <div className="">
                                  <div className="">+{symbol.change}%</div>
                                  <div className="text-sm text-gray-500">+{symbol.general.change}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">

                                <div className="">
                                  <div className="bg-cyan-300">+{symbol.Total_gain}%</div>
                                  <div className="text-sm text-gray-500">+{symbol.general.Total_gain}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">

                                <div className="">
                                  <div className="">+{symbol.Day_gain}%</div>
                                  <div className="text-sm text-gray-500">+{symbol.general.Day_gain}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap flex justify-between">
                              <div className="">+{symbol.open}%</div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center justify-stretch">
              <Button
                className="w-3/12"
              >
                See All
              </Button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}