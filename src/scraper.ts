import puppeteer from "puppeteer";

(async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto("https://majra.me/opportunities");

	await page.evaluate(() => {
		// redundant step, but show how we get to remote anchor tag
		$("button[title = 'All Types' ]").click();

		const a: HTMLAnchorElement | null = document.querySelector(
			"ul > li:nth-child(7) > a"
		);
		a!.click();
		// $("ul > li:nth-child(7) > a").first().click();
	});

	await page.waitForTimeout(5000);

	const titles = await page.evaluate(() => {
		const tits: string[] = [];
		const elements = document.querySelectorAll("h4.card-title > a");
		elements.forEach((element: any) => tits.push(element.innerHTML));
		return tits;
	});
	console.log(titles);
	await browser.close();
})();
