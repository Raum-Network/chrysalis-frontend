"use client"

import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Wallet, ArrowUpDown, PieChart, DollarSign , ArrowRightLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'

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
  const { theme, setTheme } = useTheme()
  const [selectedAsset, setSelectedAsset] = useState('stETH')
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [stakeProgress, setStakeProgress] = useState(0)
  const [unstakeProgress, setUnstakeProgress] = useState(0)
  const [stakeComplete, setStakeComplete] = useState(false)
  const [unstakeComplete, setUnstakeComplete] = useState(false)
  const [swapFrom, setSwapFrom] = useState(swapPairs[0].from)
  const [swapTo, setSwapTo] = useState(swapPairs[0].to)
  const [swapFromAmount, setSwapFromAmount] = useState('')
  const [swapToAmount, setSwapToAmount] = useState('')
  const [swapComplete, setSwapComplete] = useState(false)
  const simulateTransaction = (setProgress:any, setComplete:any) => {
    setProgress(0)
    setComplete(false)
    const interval = setInterval(() => {
      setProgress((oldProgress:any) => {
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
    // Simulate swap transaction
    setTimeout(() => {
      setSwapComplete(true)
      setTimeout(() => setSwapComplete(false), 3000)
    }, 1000)
  }

  const handleSwapFromChange = (value: string) => {
    setSwapFromAmount(value)
    // Simulate real-time price conversion (replace with actual conversion logic)
    setSwapToAmount((parseFloat(value) * 1.5).toFixed(2))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary dark:from-background dark:to-secondary-dark flex flex-col">
      <header className="flex justify-between items-center p-4 border-b bg-background/80 backdrop-blur-sm">
        <h1 className="text-2xl font-bold">Chrysalis Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="outline">
            <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.walletBalance} XLM</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staked Assets</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.stakedAssets} XLM</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current APY</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.currentAPY}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earned Yield</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.earnedYield} XLM</div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="stake" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stake">Stake</TabsTrigger>
              <TabsTrigger value="unstake">Unstake</TabsTrigger>
              <TabsTrigger value="bridge">Bridge</TabsTrigger>
              <TabsTrigger value="swap">Swap</TabsTrigger>
            </TabsList>
            <TabsContent value="stake" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Stake Assets</CardTitle>
                  <CardDescription>Choose an asset and amount to stake</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="stake-asset">Asset</Label>
                      <Select onValueChange={setSelectedAsset} defaultValue={selectedAsset}>
                        <SelectTrigger id="stake-asset">
                          <SelectValue placeholder="Select asset" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockData.supportedAssets.map((asset) => (
                            <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stake-amount">Amount</Label>
                      <Input
                        id="stake-amount"
                        type="number"
                        placeholder="Enter amount to stake"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleStake}>Stake</Button>
                    {stakeProgress > 0 && (
                      <div className="space-y-2">
                        <Progress value={stakeProgress} className="w-full" />
                        <p className="text-sm text-muted-foreground">Staking in progress: {stakeProgress}%</p>
                      </div>
                    )}
                    {stakeComplete && (
                      <Alert>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Your stake transaction has been completed successfully.</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="unstake" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Unstake Assets</CardTitle>
                  <CardDescription>Choose an asset and amount to unstake</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="unstake-asset">Asset</Label>
                      <Select>
                        <SelectTrigger id="unstake-asset">
                          <SelectValue placeholder="Select asset" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockData.supportedAssets.map((asset) => (
                            <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unstake-amount">Amount</Label>
                      <Input
                        id="unstake-amount"
                        type="number"
                        placeholder="Enter amount to unstake"
                        value={unstakeAmount}
                        onChange={(e) => setUnstakeAmount(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleUnstake}>Unstake</Button>
                    {unstakeProgress > 0 && (
                      <div className="space-y-2">
                        <Progress value={unstakeProgress} className="w-full" />
                        <p className="text-sm text-muted-foreground">Unstaking in progress: {unstakeProgress}%</p>
                      </div>
                    )}
                    {unstakeComplete && (
                      <Alert>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Your unstake transaction has been completed successfully.</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bridge" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bridge Assets</CardTitle>
                  <CardDescription>Bridge your assets between Ethereum and Stellar networks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockData.supportedAssets.map((asset) => (
                          <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button>Bridge</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="swap" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Swap Assets</CardTitle>
                  <CardDescription>Swap between different assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="swap-from">From</Label>
                        <Select value={swapFrom} onValueChange={setSwapFrom}>
                          <SelectTrigger id="swap-from">
                            <SelectValue placeholder="Select asset" />
                          </SelectTrigger>
                          <SelectContent>
                            {swapPairs.map((pair) => (
                              <SelectItem key={pair.from} value={pair.from}>{pair.from}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="swap-to">To</Label>
                        <Select value={swapTo} onValueChange={setSwapTo}>
                          <SelectTrigger id="swap-to">
                            <SelectValue placeholder="Select asset" />
                          </SelectTrigger>
                          <SelectContent>
                            {swapPairs.map((pair) => (
                              <SelectItem key={pair.to} value={pair.to}>{pair.to}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="swap-from-amount">Amount</Label>
                      <Input
                        id="swap-from-amount"
                        type="number"
                        placeholder={`Enter amount in ${swapFrom}`}
                        value={swapFromAmount}
                        onChange={(e) => handleSwapFromChange(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="swap-to-amount">You will receive</Label>
                      <Input
                        id="swap-to-amount"
                        type="number"
                        placeholder={`Amount in ${swapTo}`}
                        value={swapToAmount}
                        readOnly
                      />
                    </div>
                    <Button onClick={handleSwap}>
                      <ArrowRightLeft className="mr-2 h-4 w-4" />
                      Swap
                    </Button>
                    {swapComplete && (
                      <Alert>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Your swap transaction has been completed successfully.</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>APY Comparison</CardTitle>
              <CardDescription>Compare APY rates from different protocols</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(mockData.apyRates).map(([protocol, rate]) => (
                  <div key={protocol} className="flex justify-between items-center">
                    <span>{protocol}</span>
                    <span className="font-bold">{rate}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="mt-auto bg-background/80 backdrop-blur-sm border-t p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2023 Chrysalis. All rights reserved.
          </div>
          <nav className="flex space-x-4 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
              Support
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}