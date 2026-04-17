import { useState, useEffect } from "react";
import { Pickaxe, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Utility to calculate SHA-256 hash
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

interface BlockState {
  id: number;
  data: string;
  nonce: number;
  previousHash: string;
  hash: string;
  isValid: boolean;
  isMining: boolean;
}

export default function Simulator() {
  const [block1, setBlock1] = useState<BlockState>({
    id: 1,
    data: "Genesis block data",
    nonce: 0,
    previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
    hash: "",
    isValid: false,
    isMining: false
  });

  const [block2, setBlock2] = useState<BlockState>({
    id: 2,
    data: "Transaction: Alice sends 5 ETH to Bob",
    nonce: 0,
    previousHash: "",
    hash: "",
    isValid: false,
    isMining: false
  });

  // Target difficulty: hash must start with "00"
  const TARGET_PREFIX = "00";

  // Calculate hashes whenever inputs change
  useEffect(() => {
    const computeHash1 = async () => {
      if (block1.isMining) return;
      const content = `${block1.id}${block1.data}${block1.nonce}${block1.previousHash}`;
      const newHash = await sha256(content);
      const valid = newHash.startsWith(TARGET_PREFIX);
      setBlock1(prev => ({ ...prev, hash: newHash, isValid: valid }));
    };
    computeHash1();
  }, [block1.data, block1.nonce, block1.isMining]);

  useEffect(() => {
    const computeHash2 = async () => {
      if (block2.isMining) return;
      const content = `${block2.id}${block2.data}${block2.nonce}${block1.hash}`;
      const newHash = await sha256(content);
      const valid = newHash.startsWith(TARGET_PREFIX);
      setBlock2(prev => ({ ...prev, previousHash: block1.hash, hash: newHash, isValid: valid && block1.isValid }));
    };
    computeHash2();
  }, [block2.data, block2.nonce, block1.hash, block1.isValid, block2.isMining]);


  const mineBlock = async (blockNum: 1 | 2) => {
    const setBlock = blockNum === 1 ? setBlock1 : setBlock2;
    const block = blockNum === 1 ? block1 : block2;
    const prevHash = blockNum === 1 ? block.previousHash : block1.hash;

    setBlock(prev => ({ ...prev, isMining: true }));

    // Mine in chunks so we don't freeze the main thread completely
    let currentNonce = 0;
    let found = false;
    let finalHash = "";

    // A simple non-blocking loop wrapper
    const mineChunk = async () => {
      const chunk_size = 500;
      for (let i = 0; i < chunk_size; i++) {
        const content = `${block.id}${block.data}${currentNonce}${prevHash}`;
        finalHash = await sha256(content);
        if (finalHash.startsWith(TARGET_PREFIX)) {
          found = true;
          break;
        }
        currentNonce++;
      }

      if (found) {
        setBlock(prev => ({ 
          ...prev, 
          nonce: currentNonce, 
          hash: finalHash, 
          isValid: true,
          isMining: false 
        }));
      } else {
        setTimeout(mineChunk, 0); // Release thread, continue mining
      }
    };

    mineChunk();
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto pt-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Block Simulator</h1>
        <p className="text-lg text-muted-foreground">
          Understand Proof of Work and Immutability. Mine the blocks until their hash starts with "00". Then change the data in Block 1 to see how it invalidates the chain.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        {/* Block 1 */}
        <Card className={`border-2 transition-colors duration-300 ${block1.isValid ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-destructive/50 bg-destructive/5'}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Block #{block1.id}</CardTitle>
              {block1.isValid ? (
                <div className="flex items-center text-emerald-500 text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 mr-1" /> Valid
                </div>
              ) : (
                <div className="flex items-center text-destructive text-sm font-bold">
                  <XCircle className="w-5 h-5 mr-1" /> Invalid
                </div>
              )}
            </div>
            <CardDescription>The Genesis Block</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Data</Label>
              <Textarea 
                value={block1.data}
                onChange={(e) => setBlock1({ ...block1, data: e.target.value })}
                className="resize-none h-24 bg-background"
                disabled={block1.isMining}
              />
            </div>
            <div className="space-y-2">
              <Label>Previous Hash</Label>
              <Input 
                value={block1.previousHash}
                readOnly
                className="font-mono text-xs text-muted-foreground bg-muted/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Nonce</Label>
              <Input 
                type="number"
                value={block1.nonce}
                onChange={(e) => setBlock1({ ...block1, nonce: parseInt(e.target.value) || 0 })}
                className="font-mono bg-background"
                disabled={block1.isMining}
              />
            </div>
            <div className="space-y-2">
              <Label>Hash</Label>
              <div className={`p-3 rounded-md font-mono text-xs break-all border ${block1.isValid ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-destructive/10 border-destructive/20 text-destructive'}`}>
                {block1.hash || "Calculating..."}
              </div>
            </div>
            <Button 
              onClick={() => mineBlock(1)} 
              disabled={block1.isMining || block1.isValid}
              className="w-full mt-4"
              variant={block1.isValid ? "secondary" : "default"}
            >
              {block1.isMining ? (
                <>Mining...</>
              ) : block1.isValid ? (
                <>Mined</>
              ) : (
                <><Pickaxe className="w-4 h-4 mr-2" /> Mine Block 1</>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Block 2 */}
        <Card className={`border-2 transition-colors duration-300 ${block2.isValid ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-destructive/50 bg-destructive/5'}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Block #{block2.id}</CardTitle>
              {block2.isValid ? (
                <div className="flex items-center text-emerald-500 text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 mr-1" /> Valid
                </div>
              ) : (
                <div className="flex items-center text-destructive text-sm font-bold">
                  <XCircle className="w-5 h-5 mr-1" /> Invalid
                </div>
              )}
            </div>
            <CardDescription>Chained Block</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Data</Label>
              <Textarea 
                value={block2.data}
                onChange={(e) => setBlock2({ ...block2, data: e.target.value })}
                className="resize-none h-24 bg-background"
                disabled={block2.isMining}
              />
            </div>
            <div className="space-y-2">
              <Label>Previous Hash</Label>
              <Input 
                value={block2.previousHash}
                readOnly
                className={`font-mono text-xs ${!block1.isValid ? 'text-destructive border-destructive/50' : 'text-muted-foreground bg-muted/50'}`}
              />
            </div>
            <div className="space-y-2">
              <Label>Nonce</Label>
              <Input 
                type="number"
                value={block2.nonce}
                onChange={(e) => setBlock2({ ...block2, nonce: parseInt(e.target.value) || 0 })}
                className="font-mono bg-background"
                disabled={block2.isMining}
              />
            </div>
            <div className="space-y-2">
              <Label>Hash</Label>
              <div className={`p-3 rounded-md font-mono text-xs break-all border ${block2.isValid ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-destructive/10 border-destructive/20 text-destructive'}`}>
                {block2.hash || "Calculating..."}
              </div>
            </div>
            <Button 
              onClick={() => mineBlock(2)} 
              disabled={block2.isMining || block2.isValid || !block1.isValid}
              className="w-full mt-4"
              variant={block2.isValid ? "secondary" : "default"}
            >
              {block2.isMining ? (
                <>Mining...</>
              ) : block2.isValid ? (
                <>Mined</>
              ) : !block1.isValid ? (
                <>Block 1 Invalid</>
              ) : (
                <><Pickaxe className="w-4 h-4 mr-2" /> Mine Block 2</>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
