
import React from "react";
import { cn } from "@/lib/utils";

interface CatImageProps {
  selectedSkin: number;
  isClicking: boolean;
  showGoldEffect: boolean;
  bonusThreshold: number;
  onClick: () => void;
}

const CatImage: React.FC<CatImageProps> = ({
  selectedSkin,
  isClicking,
  showGoldEffect,
  bonusThreshold,
  onClick,
}) => {
  // Mapping of skin IDs to image filenames
  const skinImageMap: Record<number, string> = {
    1: '68eddb32-8d0d-4a0b-a8b5-d716d3d6850a.png',
    2: 'bc7df56a-ee75-4568-874a-202cf62a7000.png',
    3: '8245fbc5-57f4-4ad2-ad2b-0943c47fba04.png',
    4: '6509b874-2e9c-499a-856f-a9c31e1ae7d5.png',
    5: '2d550ec7-3cfc-409f-beaa-f3dde80e78a8.png',
    6: 'c7311408-e251-475f-b409-3e8caedf7d00.png',
    7: '5d8df752-2d5c-4c22-afc1-e2c31ae5d036.png',
    8: '843a7795-7de4-4b7e-808b-30e7240830df.png',
    9: '470405cf-8e2c-4cb5-b8cb-75f4171799cb.png',
    10: 'fa0be052-b9ac-45d0-bc4d-644963752dd2.png',
    11: 'f0bd6a32-5ec7-45cc-8245-500a83f3a205.png',
    12: 'cd91618c-d6ae-49a8-8aee-db1b9d6bcf79.png',
    13: '97fa1580-791a-47ec-baae-f1b04d0adc90.png',
    14: 'd7f3bb46-8115-40f4-ab33-f0777c2c5c69.png',
    15: '3a6ec9bf-07a9-4915-a914-747057114163.png',
    16: '82818560-f292-4545-8eda-9e0ee3ec1ef5.png',
    17: '42a193d8-65dd-4558-a637-c572d1f2730f.png',
    18: '2cee5513-e0c8-4f80-8e4e-e96200873e85.png',
    19: '8db83a43-83a7-4705-8f83-9346b999d612.png',
    20: 'e5312b8e-070b-4b81-8c11-b77d02a2b077.png',
    21: '28d56a06-8b61-4d5f-9ab0-86cbf600cb4a.png',
    22: 'd0379cee-266c-4d62-9d40-53572c041dff.png',
    23: 'd123daca-876c-4896-8523-087df4d3b0ec.png',
    // Case skins
    24: '1f17a9f9-6010-4c7f-bf25-813e600f4e6e.png',
    25: '7873fefb-0b9b-4294-a71a-9e9fdb215334.png',
    26: '28390614-5871-43aa-ba68-d69f1b0b1a68.png',
    27: 'aac2b114-f2a0-4682-aa2d-b6a586dc17b9.png',
    28: '87e4031b-7db7-41fb-b3d5-2cb74207ab98.png',
    29: 'bbbb7ef3-be7b-43d2-8485-49151bb80279.png',
    30: '768b884a-8b5f-4ac1-81f4-6362128f8e16.png',
    31: '150b5ffb-6243-45ee-92bb-b6d76ad897b3.png',
    // Tigra case skins
    32: 'd2d1f6ba-441f-490a-8ccf-cc4eb80ff9a2.png',
    33: 'a8798ca4-b0ca-4e51-b57b-8e0aa772662c.png',
    34: '158a54f5-0f5a-4936-903f-d11a9184da87.png',
    35: '26688a77-284a-469c-95e7-a4f175089e66.png',
    36: 'c78f06c2-e05e-4078-8ac5-7c322d1fc3b6.png',
    37: '8b467f2f-9059-4d2c-b660-d2c963258453.png',
    38: '70fe6fae-7880-4a7e-9c80-f30f102bfe2f.png',
    39: 'd70cda16-a51e-44d8-bd91-e824b64f161c.png',
    40: '94c34969-72b0-4360-83ea-9cfedd83f163.png',
    41: 'streamer-willy.png',
    42: 'zleyd-willy.png',
    43: 'vi-character.png'
  };

  const imagePath = `/lovable-uploads/${skinImageMap[selectedSkin] || skinImageMap[1]}`;

  return (
    <div
      className="cat-container relative mx-auto mb-4 flex items-center justify-center"
      style={{ minHeight: "320px" }}
    >
      <div 
        className={cn(
          "rounded-full p-2 cursor-pointer transition-all duration-200 glass-panel relative overflow-hidden",
          isClicking && "scale-95 brightness-105 shadow-inner",
          showGoldEffect && "shadow-[0_0_15px_5px_rgba(255,215,0,0.6)]"
        )}
        onClick={onClick}
        style={{ aspectRatio: "1/1", width: "auto", height: "auto", maxWidth: "350px" }}
      >
        <img
          src={imagePath}
          alt="Cat"
          className="cat-image transition-all rounded-full object-contain w-full h-full"
          style={{ maxWidth: "100%", userSelect: "none" }}
          draggable="false"
        />
        
        {showGoldEffect && (
          <div className="absolute inset-0 bg-yellow-500 opacity-20 animate-pulse rounded-full"></div>
        )}
      </div>
    </div>
  );
};

export default CatImage;
