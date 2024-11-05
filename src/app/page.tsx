"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Wallet, ArrowUpDown, Percent, DollarSign, LayoutDashboard, ArrowRightLeft, Fish, Waves } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'
import Preloader from './Preloader'
import AnimatedTitle from './AnimatedTitle'

// Mock data (replace with actual data fetching logic)
const mockData = {
  walletBalance: 1000,
  stakedAssets: 500,
  currentAPY: 5.2,
  earnedYield: 25.5,
  supportedAssets: ['stETH', 'rETH', 'swETH'],
  apyRates: {
    Lido: 4.8,
    RocketPool: 5.2,
    Swell: 5.0
  }
}

const swapPairs = [
  { from: 'XLM', to: 'ETH' },
  { from: 'stETH', to: 'XLM' },
  { from: 'rETH', to: 'XLM' },
]

export default function Dashboard() {
  const { setTheme } = useTheme()
  const [loading, setLoading] = useState(true)
  const [selectedAsset, setSelectedAsset] = useState('stETH')
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [stakeProgress, setStakeProgress] = useState(0)
  const [unstakeProgress, setUnstakeProgress] = useState(0)
  const [swapProgress, setSwapProgress] = useState(0)
  const [stakeComplete, setStakeComplete] = useState(false)
  const [unstakeComplete, setUnstakeComplete] = useState(false)
  const [swapFrom, setSwapFrom] = useState(swapPairs[0].from)
  const [swapTo, setSwapTo] = useState(swapPairs[0].to)
  const [swapFromAmount, setSwapFromAmount] = useState('')
  const [swapToAmount, setSwapToAmount] = useState('')
  const [swapComplete, setSwapComplete] = useState(false)

  useEffect(() => {
    setTheme('dark')
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [setTheme])

  const simulateTransaction = (setProgress, setComplete) => {
    setProgress(0)
    setComplete(false)
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval)
          setComplete(true)
          return 100
        }
        const newProgress = oldProgress + 10
        return newProgress
      })
    }, 500)
  }

  const handleStake = () => {
    simulateTransaction(setStakeProgress, setStakeComplete)
  }

  const handleUnstake = () => {
    simulateTransaction(setUnstakeProgress, setUnstakeComplete)
  }

  const handleSwap = () => {
    simulateTransaction(setSwapProgress, setSwapComplete)
  }

  const handleSwapFromChange = (value: string) => {
    setSwapFromAmount(value)
    // Simulate real-time price conversion (replace with actual conversion logic)
    setSwapToAmount((parseFloat(value) * 1.5).toFixed(2))
  }

  if (loading) {
    return <Preloader />
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a1929] text-[#a0b4c7] font-mono">
      <header className="flex justify-between items-center p-4 border-b border-[#1e3a5f]">
        <AnimatedTitle />
        <Button variant="outline" className="border-[#4fc3f7] text-[#4fc3f7] hover:bg-[#1e3a5f] rounded-none">
          <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      </header>

      <main className="container mx-auto p-4 space-y-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#4fc3f7]">Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-[#4fc3f7]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#EAFF66]">{mockData.walletBalance} XLM</div>
            </CardContent>
          </Card>
          <Card className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#4fc3f7]">Staked Assets</CardTitle>
              <LayoutDashboard className="h-4 w-4 text-[#4fc3f7]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#EAFF66]">{mockData.stakedAssets} XLM</div>
            </CardContent>
          </Card>
          <Card className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#4fc3f7]">Current APY</CardTitle>
              <Percent className="h-4 w-4 text-[#4fc3f7]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#EAFF66]">{mockData.currentAPY}%</div>
            </CardContent>
          </Card>
          <Card className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#4fc3f7]">Earned Yield</CardTitle>
              <DollarSign className="h-4 w-4 text-[#4fc3f7]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#EAFF66]">{mockData.earnedYield} XLM</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="stake" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#0f2744] border border-[#1e3a5f] rounded-none">
            <TabsTrigger value="stake" className="data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-[#4fc3f7] rounded-none">Stake</TabsTrigger>
            <TabsTrigger value="unstake" className="data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-[#4fc3f7] rounded-none">Unstake</TabsTrigger>
            <TabsTrigger value="bridge" className="data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-[#4fc3f7] rounded-none">Bridge</TabsTrigger>
            <TabsTrigger value="swap" className="data-[state=active]:bg-[#1e3a5f] data-[state=active]:text-[#4fc3f7] rounded-none">Swap</TabsTrigger>
          </TabsList>
          <TabsContent value="stake" className="mt-4">
            <Card className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
              <CardHeader>
                <CardTitle className="text-[#4fc3f7]">Stake Assets</CardTitle>
                <CardDescription>Choose an asset and amount to stake</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stake-asset" className="text-[#4fc3f7]">Asset</Label>
                    <Select onValueChange={setSelectedAsset} defaultValue={selectedAsset}>
                      <SelectTrigger id="stake-asset" className="bg-[#0a1929] border-[#1e3a5f] text-[#a0b4c7] rounded-none">
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
                        {mockData.supportedAssets.map((asset) => (
                          <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stake-amount" className="text-[#4fc3f7]">Amount</Label>
                    <Input
                      id="stake-amount"
                      type="number"
                      placeholder="Enter amount to stake"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="bg-[#0a1929] border-[#1e3a5f] text-[#a0b4c7] placeholder:text-[#a0b4c7]/50 rounded-none"
                    />
                  </div>
                  <Button onClick={handleStake} className="bg-[#4fc3f7] hover:bg-[#4fc3f7]/80 text-[#EAFF66] rounded-none">Stake</Button>
                  {stakeProgress > 0 && (
                    <div className="space-y-2">
                      <Progress value={stakeProgress} className="w-full bg-[#1e3a5f] rounded-none" indicatorClassName="bg-[#4fc3f7] rounded-none" />
                      <p className="text-sm">Staking in progress: {stakeProgress}%</p>
                    </div>
                  )}
                  {stakeComplete && (
                    <Alert className="bg-[#1e3a5f] border-[#4fc3f7] rounded-none">
                      <AlertTitle className="text-[#4fc3f7]">Success</AlertTitle>
                      <AlertDescription>Your stake transaction has been completed successfully.</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="unstake" className="mt-4">
            <Card className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
              <CardHeader>
                <CardTitle className="text-[#4fc3f7]">Unstake Assets</CardTitle>
                <CardDescription>Choose an asset and amount to unstake</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="unstake-asset" className="text-[#4fc3f7]">Asset</Label>
                    <Select>
                      <SelectTrigger id="unstake-asset" className="bg-[#0a1929] border-[#1e3a5f] text-[#a0b4c7] rounded-none">
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
                        {mockData.supportedAssets.map((asset) => (
                          <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unstake-amount" className="text-[#4fc3f7]">Amount</Label>
                    <Input
                      id="unstake-amount"
                      type="number"
                      placeholder="Enter amount to unstake"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      className="bg-[#0a1929] border-[#1e3a5f] text-[#a0b4c7] placeholder:text-[#a0b4c7]/50 rounded-none"
                    />
                  </div>
                  <Button onClick={handleUnstake} className="bg-[#4fc3f7] hover:bg-[#4fc3f7]/80 text-[#EAFF66] rounded-none">Unstake</Button>
                  {unstakeProgress > 0 && (
                    <div className="space-y-2">
                      <Progress value={unstakeProgress} className="w-full bg-[#1e3a5f] rounded-none" indicatorClassName="bg-[#4fc3f7] rounded-none" />
                      <p className="text-sm">Unstaking in progress: {unstakeProgress}%</p>
                    </div>
                  )}
                  {unstakeComplete && (
                    <Alert className="bg-[#1e3a5f] border-[#4fc3f7] rounded-none">
                      <AlertTitle className="text-[#4fc3f7]">Success</AlertTitle>
                      <AlertDescription>Your unstake transaction has been completed successfully.</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="bridge" className="mt-4">
            <Card className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
              <CardHeader>
                <CardTitle className="text-[#4fc3f7]">Bridge Assets</CardTitle>
                <CardDescription>Bridge your assets between Ethereum and Stellar networks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bridge-from" className="text-[#4fc3f7]">From</Label>
                    <Select>
                      <SelectTrigger id="bridge-from" className="bg-[#0a1929] border-[#1e3a5f] text-[#a0b4c7] rounded-none">
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="stellar">Stellar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bridge-to" className="text-[#4fc3f7]">To</Label>
                    <Select>
                      <SelectTrigger id="bridge-to" className="bg-[#0a1929] border-[#1e3a5f] text-[#a0b4c7] rounded-none">
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="stellar">Stellar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bridge-amount" className="text-[#4fc3f7]">Amount</Label>
                    <Input
                      id="bridge-amount"
                      type="number"
                      placeholder="Enter amount to bridge"
                      className="bg-[#0a1929] border-[#1e3a5f] text-[#a0b4c7] placeholder:text-[#a0b4c7]/50 rounded-none"
                    />
                  </div>
                  <Button className="bg-[#4fc3f7] hover:bg-[#4fc3f7]/80 text-[#EAFF66] rounded-none">Bridge</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="swap" className="mt-4">
            <Card className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
              <CardHeader>
                <CardTitle className="text-[#4fc3f7]">Swap Assets</CardTitle>
                <CardDescription>Swap between different assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="swap-from" className="text-[#4fc3f7]">From</Label>
                      <Select value={swapFrom} onValueChange={setSwapFrom}>
                        <SelectTrigger id="swap-from" className="bg-[#0a1929] border-[#1e3a5f] text-[#a0b4c7] rounded-none">
                          <SelectValue placeholder="Select asset" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
                          {swapPairs.map((pair) => (
                            <SelectItem key={pair.from} value={pair.from}>{pair.from}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="swap-to" className="text-[#4fc3f7]">To</Label>
                      <Select value={swapTo} onValueChange={setSwapTo}>
                        <SelectTrigger id="swap-to" className="bg-[#0a1929] border-[#1e3a5f] text-[#a0b4c7] rounded-none">
                          <SelectValue placeholder="Select asset" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
                          {swapPairs.map((pair) => (
                            <SelectItem key={pair.to} value={pair.to}>{pair.to}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="swap-from-amount" className="text-[#4fc3f7]">Amount</Label>
                    <Input
                      id="swap-from-amount"
                      type="number"
                      placeholder={`Enter amount in ${swapFrom}`}
                      value={swapFromAmount}
                      onChange={(e) => handleSwapFromChange(e.target.value)}
                      className="bg-[#0a1929] border-[#1e3a5f] text-[#a0b4c7] placeholder:text-[#a0b4c7]/50 rounded-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="swap-to-amount" className="text-[#4fc3f7]">You will receive</Label>
                    <Input
                      id="swap-to-amount"
                      type="number"
                      placeholder={`Amount in ${swapTo}`}
                      value={swapToAmount}
                      readOnly
                      className="bg-[#0a1929] border-[#1e3a5f] text-[#a0b4c7] placeholder:text-[#a0b4c7]/50 rounded-none"
                    />
                  </div>
                  <Button onClick={handleSwap} className="bg-[#4fc3f7] hover:bg-[#4fc3f7]/80 text-[#EAFF66] rounded-none">
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    Swap
                  </Button>
                  {swapProgress > 0 && (
                    <div className="space-y-2">
                      <Progress value={swapProgress} className="w-full bg-[#1e3a5f] rounded-none" indicatorClassName="bg-[#4fc3f7] rounded-none" />
                      <p className="text-sm">Swap in progress: {swapProgress}%</p>
                    </div>
                  )}
                  {swapComplete && (
                    <Alert className="bg-[#1e3a5f] border-[#4fc3f7] rounded-none">
                      <AlertTitle className="text-[#4fc3f7]">Success</AlertTitle>
                      <AlertDescription>Your swap transaction has been completed successfully.</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-[#0f2744] border-[#1e3a5f] rounded-none">
          <CardHeader>
            <CardTitle className="text-[#4fc3f7]">APY Comparison</CardTitle>
            <CardDescription>Compare APY rates from different protocols</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(mockData.apyRates).map(([protocol, rate]) => (
                <div key={protocol} className="flex justify-between items-center">
                  <span className="text-[#EAFF66]">{protocol}</span>
                  <span className="font-bold text-[#4fc3f7]">{rate}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="mt-auto bg-[#0f2744] border-t border-[#1e3a5f] p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            © 2023 ChrysalisFi by Raum Network. All rights reserved.
          </div>
          <nav className="flex space-x-4 text-sm">
            <Link href="/terms" className="hover:text-[#4fc3f7] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-[#4fc3f7] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/support" className="hover:text-[#4fc3f7] transition-colors">
              Support
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}