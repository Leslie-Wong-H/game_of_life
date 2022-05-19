let listenerHolder: any = null;

/**
 *  Reads a RLE file and sends the pattern to the xstate machine.
 *  depends on: readText - RLEDecipher
 */
function registerRLEImportListenerAndThenDestroy(
  elementID = "#rle-file-upload",
  send: (action: string, payload: unknown) => void
): void {
  const fileSelector = document.querySelector<HTMLInputElement>(
    elementID
  ) as HTMLInputElement;
  const callback = (ev: Event) => {
    const fileList = (<HTMLInputElement>ev.target).files as FileList;
    console.log(fileList);
    for (const file of fileList) {
      readText(file, send);
    }
  };
  listenerHolder = callback;
  fileSelector.addEventListener("change", listenerHolder);
}

function destroyRLEImportListener(elementID = "#rle-file-upload"): void {
  const fileSelector = document.querySelector<HTMLInputElement>(
    elementID
  ) as HTMLInputElement;
  fileSelector?.removeEventListener("change", listenerHolder);
}

function readText(
  file: Blob,
  send: (action: string, payload: unknown) => void
): void {
  const reader = new FileReader();
  const callback = (): void => {
    console.log(reader.result);
    const textResult = String(reader.result);
    const { width, height, result } = RLEDecipher(textResult);
    // Becase of the limit of JSXGraph board, for the moment
    if (width <= 41 && height <= 31) {
      send("selectPattern", { pattern: result });
    }
    destroyRLEImportListener();
  };
  reader.addEventListener("load", callback);
  reader.readAsText(file);
}

/**
 * RLE Decipher, rule description: https://conwaylife.com/wiki/Run_Length_Encoded
 * @param rawRLEtext the raw RLE text
 * @returns Object { width:number, height:number, result:CoordinatedPattern}
 */
function RLEDecipher(rawRLEtext: string): RLEDecipherResult {
  const lines = rawRLEtext.split("\n");
  console.log({ lines });
  let height = -1;
  let width = -1;
  let patternLineIndex: number;
  let rule: string;
  let result: CoordinatedPattern = [];
  for (const [index, line] of lines.entries()) {
    if (line.startsWith("#")) {
      continue;
    }
    if (line.startsWith("x")) {
      const metas = line.split(",");
      width = Number(metas[0].slice(metas[0].indexOf("=") + 1));
      height = Number(metas[1].slice(metas[1].indexOf("=") + 1));
      // b3/s23 for John Conway's Game of Life
      rule = String(metas[2]?.slice(metas[2].indexOf("=") + 1))
        .trim()
        .toLowerCase();
      rule === "b3/s23"
        ? console.log("Yes! b3/s23")
        : console.log("Oh not b3/s23");
      patternLineIndex = index + 1;

      const patternLines = lines
        .slice(patternLineIndex)
        .join("")
        .replace(/(\r\n|\n|\r)/gm, "");

      console.log(patternLines);

      result = [];

      const rleString = patternLines;
      const x = width;
      const y = height;

      //  Honer mark to
      //  https://github.com/timjacksonm/rle-decoder/blob/main/decode.js

      /**********************/
      /* rle-decoder starts */
      /**********************/

      //on number repeat next letter number of times.
      //End by splitting on $ creating multiple lines
      let decoded: mediumDecodedPattern = rleString
        .slice(0, -1)
        .replace(/(\d+)(\D)/g, function (match, num) {
          return match.split(num)[1].repeat(num);
        })
        .split("$");

      //replace letter 'o' with 1's & b with 0's ie - alive: 1 , dead: 0
      decoded = decoded.map((row) => row.replace(/o/g, "1"));
      decoded = decoded.map((row) => row.replace(/b/g, "0"));

      //for each row split into its own arrow containing single #'s
      decoded = decoded.map((row) => [...row.split("")]);

      //row length less than specifications add filler 0's
      decoded = decoded.map((row) => {
        if (row.length < x) {
          const filler = new Array(x - row.length).fill(0);
          const value = row.concat(filler);
          return value;
        } else {
          return row;
        }
      });

      //convert all string numbers to type of Number
      decoded = decoded.map((row) => row.map((string) => Number(string)));

      /**********************/
      /*  rle-decoder ends  */
      /**********************/

      if (decoded?.length === y) {
        let widthOffset = Math.floor((40 - x) / 2);
        let heightOffset = Math.floor((30 - y) / 2);
        widthOffset = widthOffset > 0 ? widthOffset : 0;
        heightOffset = heightOffset > 0 ? heightOffset : 0;
        for (let i = 0; i < y; i++) {
          for (let j = 0; j < x; j++) {
            if (decoded[i][j] === 1) {
              const tempcoord: [number, number] = [
                heightOffset + i,
                widthOffset + j,
              ];
              result.push(tempcoord);
            }
          }
        }
      }
    }
    break;
  }
  return { width, height, result };
}

/**
 * RLE Decipher, rule description: https://conwaylife.com/wiki/Run_Length_Encoded
 * @param Object { width:number, height:number, result:CoordinatedPattern}
 * @return rawRLEtext the raw RLE text
 */
function RLEEncipher(patternInfo: RLEDecipherResult): string {
  const { width, height, result } = patternInfo;

  let widthOffset = Math.floor((40 - width) / 2);
  let heightOffset = Math.floor((30 - height) / 2);
  widthOffset = widthOffset > 0 ? widthOffset : 0;
  heightOffset = heightOffset > 0 ? heightOffset : 0;

  let decoded: mediumDecodedPattern = Array(height)
    .fill(0)
    .map(() => new Array(width).fill(0) as number[]);

  for (const item of result) {
    decoded[item[0] - heightOffset][item[1] - widthOffset] = 1;
  }

  //convert all numbers to type of String
  decoded = decoded.map((row) => row.map((number) => String(number)));

  // join back to string[]
  decoded = decoded.map((row) => row.join(""));

  //replace letter '1' with o's & '0' with b's ie - alive: o , dead: b
  decoded = decoded.map((row) => row.replace(/0/g, "b"));
  decoded = decoded.map((row) => row.replace(/1/g, "o"));

  decoded = decoded.map((row) =>
    row.replace(/(b+)([^b]*)/g, function (match, subString: string) {
      // case for those RLE who have number + $ to indicate empty lines, like 14$
      if (match.split("").every((el) => el === "b") && match.length === width)
        return "";

      return match.replace(
        subString,
        `${subString.length > 1 ? subString.length : ""}b`
      );
    })
  );

  decoded = decoded.map((row) =>
    row.replace(/(o+)([^o]*)/g, function (match, subString: string) {
      return match.replace(
        subString,
        `${subString.length > 1 ? subString.length : ""}o`
      );
    })
  );

  decoded = decoded.map((row, index) => {
    // add ! to the last line
    if (index === decoded.length - 1) {
      row = row + "!";
      // remove unnecessary endian b
      if (row.endsWith("b!")) {
        row = row.replace(/(\d*)(b!)/g, function () {
          return "!";
        });
      }
      return row;
    }

    row = row + "$";
    // remove unnecessary endian b
    if (row.endsWith("b$")) {
      row = row.replace(/(\d*)(b\$)/g, function () {
        return "$";
      });
    }
    return row;
  });

  // case for those RLE who has number + $ to indicate empty lines, like 14$
  const polishedDecoded = decoded
    .join("")
    .replace(/(\$+)/g, function (match, subString: string) {
      return match.replace(
        subString,
        `${subString.length > 1 ? subString.length : ""}$`
      );
    });

  const rawRLEtext = `#C gererated from https://playgameoflife.live
x = ${width}, y = ${height}, rule = B3/S23
${polishedDecoded}`;

  return rawRLEtext;
}

export { registerRLEImportListenerAndThenDestroy, RLEDecipher, RLEEncipher };
