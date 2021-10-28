import argparse
import logging
import re

def fix_path(file : str):
  openedFile = open(file, "r")
  fileContent = openedFile.read()
  regex = r'^(\s*<file path=")(.*\/test)(.*)'
  newFileContent = ''
  for f in fileContent.splitlines():
    match = re.fullmatch(regex, f)
    if match != None:
      newFileContent += match.group(1) + 'test' + match.group(3)
    else:
      newFileContent += f
    newFileContent += '\n'
  openedFile.close()
  openedFile = open(file, "w")
  openedFile.write(newFileContent)
  openedFile.close()

def build_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(nargs=1,
                        action='store',
                        dest='fix_path',
                        )
    return parser.parse_args()


if __name__ == '__main__':
    args = build_args()
    if args.fix_path:
        fix_path(args.fix_path[0])