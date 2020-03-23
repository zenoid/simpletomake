run:
	hexo clean
	hexo generate
	rm -rf public_html/recipes
	hexo server